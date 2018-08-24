'use strict'

const test = require('tap').test
const fs = require('fs')
const path = require('path')
const temp = require('temp')
const dirdiff = require('dirdiff')
const unzip = require('../')

const archive = path.join(__dirname, '../package.json')

test('parse a file that is not an archive', function (t) {

  const unzipParser = unzip.Parse()
  fs.createReadStream(archive).pipe(unzipParser)
  unzipParser.on('error', err => {
    	t.ok(err.message.indexOf('invalid signature: 0x') !== -1)
    	t.end()
  })

  unzipParser.on('close', () => t.fail('Archive was parsed', d))
})

test('extract a file that is not an archive', function (t) {

  temp.mkdir('node-unzip-', (err, dirPath) => {
    if (err) {
      throw err
    }
    const unzipExtractor = unzip.Extract({ path: dirPath })
    unzipExtractor.on('error', err => {
    	t.ok(err.message.indexOf('invalid signature: 0x') !== -1)
    	t.end()
	 })
    unzipExtractor.on('close', () => t.fail('Archive was extracted', d))

    fs.createReadStream(archive).pipe(unzipExtractor)
  })
})

test('get content of a single file entry out of a file that is not an archive', function (t) {
  unzip.Open.file(archive)
    .then(d => t.fail('Archive was opened', d))
    .catch(err => {
    	t.equal(err.message, 'FILE_ENDED')
    	t.end()
    })
})