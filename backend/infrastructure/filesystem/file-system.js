'use strict';

const archiver = require('./archiver');
const FS = require('fs');

const STORAGE_PATH = '/../storage';

function getExtension(filename) {
    return filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;
}

function getStoragePath(magazine, contribution) {
    let path = STORAGE_PATH 
    if (magazine) path = path + '/' + magazine; 
    if (contribution) path = path + '/' + contribution
    path = path + '/';
    return path;
}

module.exports = class {
    constructor(archiver) {
        this.archiver = archiver;
    }

    GetAbsoluteStoragePath(path) {
        return __dirname + path;
    }

    async Store(file, magazine, contribution) {
        try {
            const path = getStoragePath(magazine, contribution);
            //File is .doc or .docx
            if (!file.mimetype.startsWith('image')) {
                const ext = getExtension(file.name);
                file.name = magazine + '_' + contribution + '_' + (Date.now()) + '.' + ext;
            }
            await file.mv(__dirname + path + file.name);
            console.log('File stored successfully!');
            return {
                exitcode: 0,
                name: file.name,
                path: path
            };
        } catch (err) {
            return err
        }
    }

    async Remove(path) {
        try {
            return FS.unlinkSync(__dirname + path);
        } catch(err) {
            console.log('file-system.Remove(): err:: ' + (err.message || err || 'Unknown'));
            return err;
        }
    }

    async GetCompressedDirectories(magazine, directoryList, filename = null, callback) {
        this.archiver = new archiver('zip', 9);
        let storagePath = __dirname;
        storagePath = storagePath + await getStoragePath(magazine, null);
        const archivePath = storagePath + '/' + (filename || 'magazine') + '.' + this.archiver.compressType;
        
        const output = FS.createWriteStream(archivePath);
        directoryList = await directoryList.map(x => {return {'dirname': x, 'dir': storagePath+'/'+x+'/'}});
        await this.archiver.aggregateCompressDirectory(output, directoryList, callback);

        return archivePath;
    }
}