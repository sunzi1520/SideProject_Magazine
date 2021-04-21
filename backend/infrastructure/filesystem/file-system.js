'use strict';

const FS = require('fs');
const Archiver = require('./archiver');

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

    async GetCompressedDirectories(magazine, directoryList, filename = null) {
        const storagePath = await getStoragePath(magazine, null);
        try {
          if (fs.existsSync(storagePath + '/' + (filename || 'magazine.zip'))) {
            return storagePath + '/' + (filename || 'magazine.zip');
          }
        } catch(err) {
          console.error(err)
        }
        const output = fs.createWriteStream(storagePath + '/' + (filename || 'magazine.zip'));
        this.archiver.aggregateCompressDirectory(output, directoryList);
        return storagePath + '/' + (filename || 'magazine.zip');
    }
}