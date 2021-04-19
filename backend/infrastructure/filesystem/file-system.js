'use strict';

const FS = require('fs');
const archiver = require('archiver');

const STORAGE_PATH = '/../storage';

function getExtension(filename) {
    return filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;
}

function getStoragePath(magazine, contribution) {
    return STORAGE_PATH + '/' + magazine + '/' + contribution+ '/';
}

module.exports = class {
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

    async ArchiveFolder(magazine, contribution, extension = 'zip', compressionLevel = 9) {
        const path = getStoragePath(magazine, contribution);
        return this.ArchiveFolder(path, extension, compressionLevel);
    }

    async CreateArchivement(path, extension = 'zip', compressionLevel = 9) {
        const output = fs.createWriteStream(path + '/' + path + '.' + extension);
        const archive = archiver('zip', {
            zlib: {level: compressionLevel}
        });

        // listen for all archive data to be written
        // 'close' event is fired only when a file descriptor is involved
        output.on('close', function() {
          console.log(archive.pointer() + ' total bytes');
          console.log('archiver has been finalized and the output file descriptor has closed.');
        });
        
        // This event is fired when the data source is drained no matter what was the data source.
        // It is not part of this library but rather from the NodeJS Stream API.
        // @see: https://nodejs.org/api/stream.html#stream_event_end
        output.on('end', function() {
          console.log('Data has been drained');
        });
        
        // good practice to catch warnings (ie stat failures and other non-blocking errors)
        archive.on('warning', function(err) {
          if (err.code === 'ENOENT') {
            // log warning
          } else {
            // throw error
            throw err;
          }
        });

        // good practice to catch this error explicitly
        archive.on('error', function(err) {
          throw err;
        });
        
        // pipe archive data to the file
        archive.pipe(output);

        return archive;
    }

    async ArchiveFile(file, archive) {
        if (!archive) {
            throw new Error('ERR_ARCHIVE_REQUIRED_TO_ADD');
        }

        
    }
}