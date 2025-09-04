const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const fs = require('fs');
const path = require('path');

async function imageToWebp(buffer) {
  const sticker = new Sticker(buffer, {
    pack: 'DARK-NOVA-XMD',
    author: 'DARK-NOVA-XMD',
    type: StickerTypes.FULL,
    categories: ['🤩', '🎉'],
    id: '12345',
    quality: 70,
    background: 'transparent'
  });
  return await sticker.toBuffer();
}

async function videoToWebp(buffer) {
  const sticker = new Sticker(buffer, {
    pack: 'DARK-NOVA-XMD',
    author: 'DARK-NOVA-XMD',
    type: StickerTypes.FULL,
    categories: ['🤩', '🎉'],
    id: '12345',
    quality: 70,
    background: 'transparent'
  });
  return await sticker.toBuffer();
}

async function writeExifWebp(buffer, options) {
  const sticker = new Sticker(buffer, {
    pack: options.packname || 'DARK-NOVA-XMD',
    author: options.author || 'DARK-NOVA-XMD',
    type: StickerTypes.FULL,
    categories: ['🤩', '🎉'],
    id: '12345',
    quality: 70,
    background: 'transparent'
  });
  return await sticker.toBuffer();
}

async function writeExifVid(buffer, options) {
  const sticker = new Sticker(buffer, {
    pack: options.packname || 'DARK-NOVA-XMD',
    author: options.author || 'DARK-NOVA-XMD',
    type: StickerTypes.FULL,
    categories: ['🤩', '🎉'],
    id: '12345',
    quality: 70,
    background: 'transparent'
  });
  return await sticker.toBuffer();
}

module.exports = {
  imageToWebp,
  videoToWebp,
  writeExifWebp,
  writeExifVid
};