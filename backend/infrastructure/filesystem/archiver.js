'use strict';

const archiver = require('archiver');

module.exports = class {

    constructor(compressionFile, compressionLevel) {
        let options = {};
        if (compressionFile == 'zip') {
            options.zlib = compressionLevel;
        } else if (compressionFile == 'tar') {
            options.gzipOptions = compressionLevel
        } else {
            throw new Error('ERR_COMPRESSION_TYPE_NOT_SUPPORTED');
        }

        this.archive = archiver(compressionFile, options)

        // good practice to catch warnings (ie stat failures and other non-blocking errors)
        this.archive.on('warning', function(err) {
            if (err.code === 'ENOENT') {
              // log warning
            } else {
              // throw error
              throw err;
            }
          });
          
        // good practice to catch this error explicitly
        this.archive.on('error', function(err) {
            throw err;
          });
    }

    async aggregateCompressFile(output, data) {
        this.targetDestination(output);
        await this.appendFile(data);
        this.finalize();
        return true;
    }

    async aggregateCompressDirectory(output, data) {
        this.targetDestination(output);
        await this.appendDirectory(data);
        this.finalize();
        return true;
    }

    targetDestination(output) {
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

        this.archive.pipe(output);
        return true;
    }

    appendFile(data){
        if (Array.isArray(data)) {
            return data.forEach(file => {
                this.archive.file(file, { name: file })
            })
        }
        return this.archive.file(data, { name: data });
    }

    appendDirectory(data){
        if (Array.isArray(data)) {
            return data.forEach(file => {
                this.archive.directory(file, false)
            })
        }
        return this.archive.directory(data, false);
    }

    finalize(){
        this.archive.finalize();
        return true;
    }
}
