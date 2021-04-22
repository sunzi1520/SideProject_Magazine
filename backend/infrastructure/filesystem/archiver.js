'use strict';

const archiver = require('archiver');

module.exports = class {

    constructor(compressionFile, compressionLevel) {
        this.compressType = compressionFile;
        let options = {};
        if (compressionFile == 'zip') {
            options.zlib = { 'level': compressionLevel };
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

    async aggregateCompressDirectory(output, data, callback) {
        this.targetDestination(output, callback);
        await this.appendDirectory(data);
        await this.finalize();
        console.log('aggregateCompressDirectory::pointer::' + this.archive.pointer() + ' total bytes' )
        return true;
    }

    targetDestination(output, callback) {
        // listen for all archive data to be written
        // 'close' event is fired only when a file descriptor is involved
        var tmpArchive = this.archive;
        this.output = output;
        console.log('targetDestination::output::', output);
        output.on('close', function() {
            console.log(tmpArchive.pointer() + ' total bytes');
            console.log('archiver has been finalized and the output file descriptor has closed.');
            callback(output.path);
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
                console.log(file);
                this.archive.directory(file.dir, file.dirname)
            })
        }
        return this.archive.directory(data.dir, data.dirname);
    }

    async finalize(){
        return this.archive.finalize();
    }
}
