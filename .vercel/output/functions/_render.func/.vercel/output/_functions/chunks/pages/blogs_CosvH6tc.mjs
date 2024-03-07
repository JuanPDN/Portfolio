/* empty css                          */
import { A as AstroError, c as InvalidImageService, d as ExpectedImageOptions, E as ExpectedImage, F as FailedToFetchRemoteImageDimensions, e as createAstro, f as createComponent, g as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, h as addAttribute, s as spreadAttributes, i as renderComponent, j as renderHead, k as renderSlot } from '../astro_elL8HOjn.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { i as isRemoteImage, a as isESMImportedImage, b as isLocalService, D as DEFAULT_HASH_PROPS } from '../astro/assets-service_B5_8D9RK.mjs';

const decoder = new TextDecoder();
const toUTF8String = (input, start = 0, end = input.length) => decoder.decode(input.slice(start, end));
const toHexString = (input, start = 0, end = input.length) => input.slice(start, end).reduce((memo, i) => memo + ("0" + i.toString(16)).slice(-2), "");
const readInt16LE = (input, offset = 0) => {
  const val = input[offset] + input[offset + 1] * 2 ** 8;
  return val | (val & 2 ** 15) * 131070;
};
const readUInt16BE = (input, offset = 0) => input[offset] * 2 ** 8 + input[offset + 1];
const readUInt16LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8;
const readUInt24LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16;
const readInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + (input[offset + 3] << 24);
const readUInt32BE = (input, offset = 0) => input[offset] * 2 ** 24 + input[offset + 1] * 2 ** 16 + input[offset + 2] * 2 ** 8 + input[offset + 3];
const readUInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + input[offset + 3] * 2 ** 24;
const methods = {
  readUInt16BE,
  readUInt16LE,
  readUInt32BE,
  readUInt32LE
};
function readUInt(input, bits, offset, isBigEndian) {
  offset = offset || 0;
  const endian = isBigEndian ? "BE" : "LE";
  const methodName = "readUInt" + bits + endian;
  return methods[methodName](input, offset);
}
function readBox(buffer, offset) {
  if (buffer.length - offset < 4)
    return;
  const boxSize = readUInt32BE(buffer, offset);
  if (buffer.length - offset < boxSize)
    return;
  return {
    name: toUTF8String(buffer, 4 + offset, 8 + offset),
    offset,
    size: boxSize
  };
}
function findBox(buffer, boxName, offset) {
  while (offset < buffer.length) {
    const box = readBox(buffer, offset);
    if (!box)
      break;
    if (box.name === boxName)
      return box;
    offset += box.size;
  }
}

const BMP = {
  validate: (input) => toUTF8String(input, 0, 2) === "BM",
  calculate: (input) => ({
    height: Math.abs(readInt32LE(input, 22)),
    width: readUInt32LE(input, 18)
  })
};

const TYPE_ICON = 1;
const SIZE_HEADER$1 = 2 + 2 + 2;
const SIZE_IMAGE_ENTRY = 1 + 1 + 1 + 1 + 2 + 2 + 4 + 4;
function getSizeFromOffset(input, offset) {
  const value = input[offset];
  return value === 0 ? 256 : value;
}
function getImageSize$1(input, imageIndex) {
  const offset = SIZE_HEADER$1 + imageIndex * SIZE_IMAGE_ENTRY;
  return {
    height: getSizeFromOffset(input, offset + 1),
    width: getSizeFromOffset(input, offset)
  };
}
const ICO = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0)
      return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_ICON;
  },
  calculate(input) {
    const nbImages = readUInt16LE(input, 4);
    const imageSize = getImageSize$1(input, 0);
    if (nbImages === 1)
      return imageSize;
    const imgs = [imageSize];
    for (let imageIndex = 1; imageIndex < nbImages; imageIndex += 1) {
      imgs.push(getImageSize$1(input, imageIndex));
    }
    return {
      height: imageSize.height,
      images: imgs,
      width: imageSize.width
    };
  }
};

const TYPE_CURSOR = 2;
const CUR = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0)
      return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_CURSOR;
  },
  calculate: (input) => ICO.calculate(input)
};

const DDS = {
  validate: (input) => readUInt32LE(input, 0) === 542327876,
  calculate: (input) => ({
    height: readUInt32LE(input, 12),
    width: readUInt32LE(input, 16)
  })
};

const gifRegexp = /^GIF8[79]a/;
const GIF = {
  validate: (input) => gifRegexp.test(toUTF8String(input, 0, 6)),
  calculate: (input) => ({
    height: readUInt16LE(input, 8),
    width: readUInt16LE(input, 6)
  })
};

const brandMap = {
  avif: "avif",
  mif1: "heif",
  msf1: "heif",
  // hief-sequence
  heic: "heic",
  heix: "heic",
  hevc: "heic",
  // heic-sequence
  hevx: "heic"
  // heic-sequence
};
function detectBrands(buffer, start, end) {
  let brandsDetected = {};
  for (let i = start; i <= end; i += 4) {
    const brand = toUTF8String(buffer, i, i + 4);
    if (brand in brandMap) {
      brandsDetected[brand] = 1;
    }
  }
  if ("avif" in brandsDetected) {
    return "avif";
  } else if ("heic" in brandsDetected || "heix" in brandsDetected || "hevc" in brandsDetected || "hevx" in brandsDetected) {
    return "heic";
  } else if ("mif1" in brandsDetected || "msf1" in brandsDetected) {
    return "heif";
  }
}
const HEIF = {
  validate(buffer) {
    const ftype = toUTF8String(buffer, 4, 8);
    const brand = toUTF8String(buffer, 8, 12);
    return "ftyp" === ftype && brand in brandMap;
  },
  calculate(buffer) {
    const metaBox = findBox(buffer, "meta", 0);
    const iprpBox = metaBox && findBox(buffer, "iprp", metaBox.offset + 12);
    const ipcoBox = iprpBox && findBox(buffer, "ipco", iprpBox.offset + 8);
    const ispeBox = ipcoBox && findBox(buffer, "ispe", ipcoBox.offset + 8);
    if (ispeBox) {
      return {
        height: readUInt32BE(buffer, ispeBox.offset + 16),
        width: readUInt32BE(buffer, ispeBox.offset + 12),
        type: detectBrands(buffer, 8, metaBox.offset)
      };
    }
    throw new TypeError("Invalid HEIF, no size found");
  }
};

const SIZE_HEADER = 4 + 4;
const FILE_LENGTH_OFFSET = 4;
const ENTRY_LENGTH_OFFSET = 4;
const ICON_TYPE_SIZE = {
  ICON: 32,
  "ICN#": 32,
  // m => 16 x 16
  "icm#": 16,
  icm4: 16,
  icm8: 16,
  // s => 16 x 16
  "ics#": 16,
  ics4: 16,
  ics8: 16,
  is32: 16,
  s8mk: 16,
  icp4: 16,
  // l => 32 x 32
  icl4: 32,
  icl8: 32,
  il32: 32,
  l8mk: 32,
  icp5: 32,
  ic11: 32,
  // h => 48 x 48
  ich4: 48,
  ich8: 48,
  ih32: 48,
  h8mk: 48,
  // . => 64 x 64
  icp6: 64,
  ic12: 32,
  // t => 128 x 128
  it32: 128,
  t8mk: 128,
  ic07: 128,
  // . => 256 x 256
  ic08: 256,
  ic13: 256,
  // . => 512 x 512
  ic09: 512,
  ic14: 512,
  // . => 1024 x 1024
  ic10: 1024
};
function readImageHeader(input, imageOffset) {
  const imageLengthOffset = imageOffset + ENTRY_LENGTH_OFFSET;
  return [
    toUTF8String(input, imageOffset, imageLengthOffset),
    readUInt32BE(input, imageLengthOffset)
  ];
}
function getImageSize(type) {
  const size = ICON_TYPE_SIZE[type];
  return { width: size, height: size, type };
}
const ICNS = {
  validate: (input) => toUTF8String(input, 0, 4) === "icns",
  calculate(input) {
    const inputLength = input.length;
    const fileLength = readUInt32BE(input, FILE_LENGTH_OFFSET);
    let imageOffset = SIZE_HEADER;
    let imageHeader = readImageHeader(input, imageOffset);
    let imageSize = getImageSize(imageHeader[0]);
    imageOffset += imageHeader[1];
    if (imageOffset === fileLength)
      return imageSize;
    const result = {
      height: imageSize.height,
      images: [imageSize],
      width: imageSize.width
    };
    while (imageOffset < fileLength && imageOffset < inputLength) {
      imageHeader = readImageHeader(input, imageOffset);
      imageSize = getImageSize(imageHeader[0]);
      imageOffset += imageHeader[1];
      result.images.push(imageSize);
    }
    return result;
  }
};

const J2C = {
  // TODO: this doesn't seem right. SIZ marker doesn't have to be right after the SOC
  validate: (input) => toHexString(input, 0, 4) === "ff4fff51",
  calculate: (input) => ({
    height: readUInt32BE(input, 12),
    width: readUInt32BE(input, 8)
  })
};

const JP2 = {
  validate(input) {
    if (readUInt32BE(input, 4) !== 1783636e3 || readUInt32BE(input, 0) < 1)
      return false;
    const ftypBox = findBox(input, "ftyp", 0);
    if (!ftypBox)
      return false;
    return readUInt32BE(input, ftypBox.offset + 4) === 1718909296;
  },
  calculate(input) {
    const jp2hBox = findBox(input, "jp2h", 0);
    const ihdrBox = jp2hBox && findBox(input, "ihdr", jp2hBox.offset + 8);
    if (ihdrBox) {
      return {
        height: readUInt32BE(input, ihdrBox.offset + 8),
        width: readUInt32BE(input, ihdrBox.offset + 12)
      };
    }
    throw new TypeError("Unsupported JPEG 2000 format");
  }
};

const EXIF_MARKER = "45786966";
const APP1_DATA_SIZE_BYTES = 2;
const EXIF_HEADER_BYTES = 6;
const TIFF_BYTE_ALIGN_BYTES = 2;
const BIG_ENDIAN_BYTE_ALIGN = "4d4d";
const LITTLE_ENDIAN_BYTE_ALIGN = "4949";
const IDF_ENTRY_BYTES = 12;
const NUM_DIRECTORY_ENTRIES_BYTES = 2;
function isEXIF(input) {
  return toHexString(input, 2, 6) === EXIF_MARKER;
}
function extractSize(input, index) {
  return {
    height: readUInt16BE(input, index),
    width: readUInt16BE(input, index + 2)
  };
}
function extractOrientation(exifBlock, isBigEndian) {
  const idfOffset = 8;
  const offset = EXIF_HEADER_BYTES + idfOffset;
  const idfDirectoryEntries = readUInt(exifBlock, 16, offset, isBigEndian);
  for (let directoryEntryNumber = 0; directoryEntryNumber < idfDirectoryEntries; directoryEntryNumber++) {
    const start = offset + NUM_DIRECTORY_ENTRIES_BYTES + directoryEntryNumber * IDF_ENTRY_BYTES;
    const end = start + IDF_ENTRY_BYTES;
    if (start > exifBlock.length) {
      return;
    }
    const block = exifBlock.slice(start, end);
    const tagNumber = readUInt(block, 16, 0, isBigEndian);
    if (tagNumber === 274) {
      const dataFormat = readUInt(block, 16, 2, isBigEndian);
      if (dataFormat !== 3) {
        return;
      }
      const numberOfComponents = readUInt(block, 32, 4, isBigEndian);
      if (numberOfComponents !== 1) {
        return;
      }
      return readUInt(block, 16, 8, isBigEndian);
    }
  }
}
function validateExifBlock(input, index) {
  const exifBlock = input.slice(APP1_DATA_SIZE_BYTES, index);
  const byteAlign = toHexString(
    exifBlock,
    EXIF_HEADER_BYTES,
    EXIF_HEADER_BYTES + TIFF_BYTE_ALIGN_BYTES
  );
  const isBigEndian = byteAlign === BIG_ENDIAN_BYTE_ALIGN;
  const isLittleEndian = byteAlign === LITTLE_ENDIAN_BYTE_ALIGN;
  if (isBigEndian || isLittleEndian) {
    return extractOrientation(exifBlock, isBigEndian);
  }
}
function validateInput(input, index) {
  if (index > input.length) {
    throw new TypeError("Corrupt JPG, exceeded buffer limits");
  }
}
const JPG = {
  validate: (input) => toHexString(input, 0, 2) === "ffd8",
  calculate(input) {
    input = input.slice(4);
    let orientation;
    let next;
    while (input.length) {
      const i = readUInt16BE(input, 0);
      if (input[i] !== 255) {
        input = input.slice(1);
        continue;
      }
      if (isEXIF(input)) {
        orientation = validateExifBlock(input, i);
      }
      validateInput(input, i);
      next = input[i + 1];
      if (next === 192 || next === 193 || next === 194) {
        const size = extractSize(input, i + 5);
        if (!orientation) {
          return size;
        }
        return {
          height: size.height,
          orientation,
          width: size.width
        };
      }
      input = input.slice(i + 2);
    }
    throw new TypeError("Invalid JPG, no size found");
  }
};

const KTX = {
  validate: (input) => {
    const signature = toUTF8String(input, 1, 7);
    return ["KTX 11", "KTX 20"].includes(signature);
  },
  calculate: (input) => {
    const type = input[5] === 49 ? "ktx" : "ktx2";
    const offset = type === "ktx" ? 36 : 20;
    return {
      height: readUInt32LE(input, offset + 4),
      width: readUInt32LE(input, offset),
      type
    };
  }
};

const pngSignature = "PNG\r\n\n";
const pngImageHeaderChunkName = "IHDR";
const pngFriedChunkName = "CgBI";
const PNG = {
  validate(input) {
    if (pngSignature === toUTF8String(input, 1, 8)) {
      let chunkName = toUTF8String(input, 12, 16);
      if (chunkName === pngFriedChunkName) {
        chunkName = toUTF8String(input, 28, 32);
      }
      if (chunkName !== pngImageHeaderChunkName) {
        throw new TypeError("Invalid PNG");
      }
      return true;
    }
    return false;
  },
  calculate(input) {
    if (toUTF8String(input, 12, 16) === pngFriedChunkName) {
      return {
        height: readUInt32BE(input, 36),
        width: readUInt32BE(input, 32)
      };
    }
    return {
      height: readUInt32BE(input, 20),
      width: readUInt32BE(input, 16)
    };
  }
};

const PNMTypes = {
  P1: "pbm/ascii",
  P2: "pgm/ascii",
  P3: "ppm/ascii",
  P4: "pbm",
  P5: "pgm",
  P6: "ppm",
  P7: "pam",
  PF: "pfm"
};
const handlers = {
  default: (lines) => {
    let dimensions = [];
    while (lines.length > 0) {
      const line = lines.shift();
      if (line[0] === "#") {
        continue;
      }
      dimensions = line.split(" ");
      break;
    }
    if (dimensions.length === 2) {
      return {
        height: parseInt(dimensions[1], 10),
        width: parseInt(dimensions[0], 10)
      };
    } else {
      throw new TypeError("Invalid PNM");
    }
  },
  pam: (lines) => {
    const size = {};
    while (lines.length > 0) {
      const line = lines.shift();
      if (line.length > 16 || line.charCodeAt(0) > 128) {
        continue;
      }
      const [key, value] = line.split(" ");
      if (key && value) {
        size[key.toLowerCase()] = parseInt(value, 10);
      }
      if (size.height && size.width) {
        break;
      }
    }
    if (size.height && size.width) {
      return {
        height: size.height,
        width: size.width
      };
    } else {
      throw new TypeError("Invalid PAM");
    }
  }
};
const PNM = {
  validate: (input) => toUTF8String(input, 0, 2) in PNMTypes,
  calculate(input) {
    const signature = toUTF8String(input, 0, 2);
    const type = PNMTypes[signature];
    const lines = toUTF8String(input, 3).split(/[\r\n]+/);
    const handler = handlers[type] || handlers.default;
    return handler(lines);
  }
};

const PSD = {
  validate: (input) => toUTF8String(input, 0, 4) === "8BPS",
  calculate: (input) => ({
    height: readUInt32BE(input, 14),
    width: readUInt32BE(input, 18)
  })
};

const svgReg = /<svg\s([^>"']|"[^"]*"|'[^']*')*>/;
const extractorRegExps = {
  height: /\sheight=(['"])([^%]+?)\1/,
  root: svgReg,
  viewbox: /\sviewBox=(['"])(.+?)\1/i,
  width: /\swidth=(['"])([^%]+?)\1/
};
const INCH_CM = 2.54;
const units = {
  in: 96,
  cm: 96 / INCH_CM,
  em: 16,
  ex: 8,
  m: 96 / INCH_CM * 100,
  mm: 96 / INCH_CM / 10,
  pc: 96 / 72 / 12,
  pt: 96 / 72,
  px: 1
};
const unitsReg = new RegExp(
  // eslint-disable-next-line regexp/prefer-d
  `^([0-9.]+(?:e\\d+)?)(${Object.keys(units).join("|")})?$`
);
function parseLength(len) {
  const m = unitsReg.exec(len);
  if (!m) {
    return void 0;
  }
  return Math.round(Number(m[1]) * (units[m[2]] || 1));
}
function parseViewbox(viewbox) {
  const bounds = viewbox.split(" ");
  return {
    height: parseLength(bounds[3]),
    width: parseLength(bounds[2])
  };
}
function parseAttributes(root) {
  const width = root.match(extractorRegExps.width);
  const height = root.match(extractorRegExps.height);
  const viewbox = root.match(extractorRegExps.viewbox);
  return {
    height: height && parseLength(height[2]),
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    viewbox: viewbox && parseViewbox(viewbox[2]),
    width: width && parseLength(width[2])
  };
}
function calculateByDimensions(attrs) {
  return {
    height: attrs.height,
    width: attrs.width
  };
}
function calculateByViewbox(attrs, viewbox) {
  const ratio = viewbox.width / viewbox.height;
  if (attrs.width) {
    return {
      height: Math.floor(attrs.width / ratio),
      width: attrs.width
    };
  }
  if (attrs.height) {
    return {
      height: attrs.height,
      width: Math.floor(attrs.height * ratio)
    };
  }
  return {
    height: viewbox.height,
    width: viewbox.width
  };
}
const SVG = {
  // Scan only the first kilo-byte to speed up the check on larger files
  validate: (input) => svgReg.test(toUTF8String(input, 0, 1e3)),
  calculate(input) {
    const root = toUTF8String(input).match(extractorRegExps.root);
    if (root) {
      const attrs = parseAttributes(root[0]);
      if (attrs.width && attrs.height) {
        return calculateByDimensions(attrs);
      }
      if (attrs.viewbox) {
        return calculateByViewbox(attrs, attrs.viewbox);
      }
    }
    throw new TypeError("Invalid SVG");
  }
};

const TGA = {
  validate(input) {
    return readUInt16LE(input, 0) === 0 && readUInt16LE(input, 4) === 0;
  },
  calculate(input) {
    return {
      height: readUInt16LE(input, 14),
      width: readUInt16LE(input, 12)
    };
  }
};

function readIFD(input, isBigEndian) {
  const ifdOffset = readUInt(input, 32, 4, isBigEndian);
  return input.slice(ifdOffset + 2);
}
function readValue(input, isBigEndian) {
  const low = readUInt(input, 16, 8, isBigEndian);
  const high = readUInt(input, 16, 10, isBigEndian);
  return (high << 16) + low;
}
function nextTag(input) {
  if (input.length > 24) {
    return input.slice(12);
  }
}
function extractTags(input, isBigEndian) {
  const tags = {};
  let temp = input;
  while (temp && temp.length) {
    const code = readUInt(temp, 16, 0, isBigEndian);
    const type = readUInt(temp, 16, 2, isBigEndian);
    const length = readUInt(temp, 32, 4, isBigEndian);
    if (code === 0) {
      break;
    } else {
      if (length === 1 && (type === 3 || type === 4)) {
        tags[code] = readValue(temp, isBigEndian);
      }
      temp = nextTag(temp);
    }
  }
  return tags;
}
function determineEndianness(input) {
  const signature = toUTF8String(input, 0, 2);
  if ("II" === signature) {
    return "LE";
  } else if ("MM" === signature) {
    return "BE";
  }
}
const signatures = [
  // '492049', // currently not supported
  "49492a00",
  // Little endian
  "4d4d002a"
  // Big Endian
  // '4d4d002a', // BigTIFF > 4GB. currently not supported
];
const TIFF = {
  validate: (input) => signatures.includes(toHexString(input, 0, 4)),
  calculate(input) {
    const isBigEndian = determineEndianness(input) === "BE";
    const ifdBuffer = readIFD(input, isBigEndian);
    const tags = extractTags(ifdBuffer, isBigEndian);
    const width = tags[256];
    const height = tags[257];
    if (!width || !height) {
      throw new TypeError("Invalid Tiff. Missing tags");
    }
    return { height, width };
  }
};

function calculateExtended(input) {
  return {
    height: 1 + readUInt24LE(input, 7),
    width: 1 + readUInt24LE(input, 4)
  };
}
function calculateLossless(input) {
  return {
    height: 1 + ((input[4] & 15) << 10 | input[3] << 2 | (input[2] & 192) >> 6),
    width: 1 + ((input[2] & 63) << 8 | input[1])
  };
}
function calculateLossy(input) {
  return {
    height: readInt16LE(input, 8) & 16383,
    width: readInt16LE(input, 6) & 16383
  };
}
const WEBP = {
  validate(input) {
    const riffHeader = "RIFF" === toUTF8String(input, 0, 4);
    const webpHeader = "WEBP" === toUTF8String(input, 8, 12);
    const vp8Header = "VP8" === toUTF8String(input, 12, 15);
    return riffHeader && webpHeader && vp8Header;
  },
  calculate(input) {
    const chunkHeader = toUTF8String(input, 12, 16);
    input = input.slice(20, 30);
    if (chunkHeader === "VP8X") {
      const extendedHeader = input[0];
      const validStart = (extendedHeader & 192) === 0;
      const validEnd = (extendedHeader & 1) === 0;
      if (validStart && validEnd) {
        return calculateExtended(input);
      } else {
        throw new TypeError("Invalid WebP");
      }
    }
    if (chunkHeader === "VP8 " && input[0] !== 47) {
      return calculateLossy(input);
    }
    const signature = toHexString(input, 3, 6);
    if (chunkHeader === "VP8L" && signature !== "9d012a") {
      return calculateLossless(input);
    }
    throw new TypeError("Invalid WebP");
  }
};

const typeHandlers = /* @__PURE__ */ new Map([
  ["bmp", BMP],
  ["cur", CUR],
  ["dds", DDS],
  ["gif", GIF],
  ["heif", HEIF],
  ["icns", ICNS],
  ["ico", ICO],
  ["j2c", J2C],
  ["jp2", JP2],
  ["jpg", JPG],
  ["ktx", KTX],
  ["png", PNG],
  ["pnm", PNM],
  ["psd", PSD],
  ["svg", SVG],
  ["tga", TGA],
  ["tiff", TIFF],
  ["webp", WEBP]
]);
const types = Array.from(typeHandlers.keys());

const firstBytes = /* @__PURE__ */ new Map([
  [56, "psd"],
  [66, "bmp"],
  [68, "dds"],
  [71, "gif"],
  [73, "tiff"],
  [77, "tiff"],
  [82, "webp"],
  [105, "icns"],
  [137, "png"],
  [255, "jpg"]
]);
function detector(input) {
  const byte = input[0];
  const type = firstBytes.get(byte);
  if (type && typeHandlers.get(type).validate(input)) {
    return type;
  }
  return types.find((fileType) => typeHandlers.get(fileType).validate(input));
}

const globalOptions = {
  disabledTypes: []
};
function lookup(input) {
  const type = detector(input);
  if (typeof type !== "undefined") {
    if (globalOptions.disabledTypes.indexOf(type) > -1) {
      throw new TypeError("disabled file type: " + type);
    }
    const size = typeHandlers.get(type).calculate(input);
    if (size !== void 0) {
      size.type = size.type ?? type;
      return size;
    }
  }
  throw new TypeError("unsupported file type: " + type);
}

async function probe(url) {
  const response = await fetch(url);
  if (!response.body || !response.ok) {
    throw new Error("Failed to fetch image");
  }
  const reader = response.body.getReader();
  let done, value;
  let accumulatedChunks = new Uint8Array();
  while (!done) {
    const readResult = await reader.read();
    done = readResult.done;
    if (done)
      break;
    if (readResult.value) {
      value = readResult.value;
      let tmp = new Uint8Array(accumulatedChunks.length + value.length);
      tmp.set(accumulatedChunks, 0);
      tmp.set(value, accumulatedChunks.length);
      accumulatedChunks = tmp;
      try {
        const dimensions = lookup(accumulatedChunks);
        if (dimensions) {
          await reader.cancel();
          return dimensions;
        }
      } catch (error) {
      }
    }
  }
  throw new Error("Failed to parse the size");
}

async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      '../astro/assets-service_B5_8D9RK.mjs'
    ).then(n => n.g).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset)
      globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: typeof options.src === "object" && "then" in options.src ? (await options.src).default ?? await options.src : options.src
  };
  if (options.inferSize && isRemoteImage(resolvedOptions.src)) {
    try {
      const result = await probe(resolvedOptions.src);
      resolvedOptions.width ??= result.width;
      resolvedOptions.height ??= result.height;
      delete resolvedOptions.inferSize;
    } catch {
      throw new AstroError({
        ...FailedToFetchRemoteImageDimensions,
        message: FailedToFetchRemoteImageDimensions.message(resolvedOptions.src)
      });
    }
  }
  const originalPath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : resolvedOptions.src;
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  resolvedOptions.src = clonedSrc;
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => ({
      transform: srcSet.transform,
      url: await service.getURL(srcSet.transform, imageConfig),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }))
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    imageURL = globalThis.astroAsset.addStaticImage(validatedOptions, propsToHash, originalPath);
    srcSets = srcSetTransforms.map((srcSet) => ({
      transform: srcSet.transform,
      url: globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash, originalPath),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }));
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$a = createAstro();
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(additionalAttributes)}${spreadAttributes(image.attributes)}>`;
}, "/Users/juandelgadonivia/Documents/Portfolio/node_modules/astro/components/Image.astro", void 0);

const $$Astro$9 = createAstro();
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({ ...props, format, widths: props.widths, densities: props.densities })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(props.src) && specialFormatsFallback.includes(props.src.format)) {
    resultFallbackFormat = props.src.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionalAttributes = {};
  if (props.sizes) {
    sourceAdditionalAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute("image/" + image.options.format, "type")}${spreadAttributes(sourceAdditionalAttributes)}>`;
  })} <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(imgAdditionalAttributes)}${spreadAttributes(fallbackImage.attributes)}> </picture>`;
}, "/Users/juandelgadonivia/Documents/Portfolio/node_modules/astro/components/Picture.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[]};
					const outDir = new URL("file:///Users/juandelgadonivia/Documents/Portfolio/.vercel/output/static/");
					new URL("_astro", outDir);
					const getImage = async (options) => await getImage$1(options, imageConfig);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$8 = createAstro();
const $$ToggleTheme = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$ToggleTheme;
  return renderTemplate(_a || (_a = __template(["", '<div title="Change Theme" class="dropdown dropdown-end" id="theme-selector"> <div tabindex="0" class="btn gap-1 normal-case btn-ghost"> <svg xmlns="http://www.w3.org/2000/svg" class="inline-block h-5 w-5 stroke-current md:h-6 md:w-6" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25"></path> <path d="M8.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path> <path d="M12.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path> <path d="M16.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path> </svg> <span class="hidden md:inline">Theme</span> <svg width="12px" height="12px" class="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path> </svg> </div> <div class="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-px max-h-96 h-[70vh] w-52 overflow-y-auto shadow-2xl mt-16"> <div class="grid grid-cols-1 gap-3 p-3" tabindex="0"> <div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2 outline" data-set-theme="light" data-act-class="outline"> <div data-theme="light" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"> <div class="grid grid-cols-5 grid-rows-3"> <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"> <div class="flex-grow text-sm font-bold">light</div> <div class="flex flex-shrink-0 flex-wrap gap-1"> <div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div> </div> </div> </div> </div> </div><div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" data-set-theme="dark" data-act-class="outline"> <div data-theme="dark" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"> <div class="grid grid-cols-5 grid-rows-3"> <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"> <div class="flex-grow text-sm font-bold">dark</div> <div class="flex flex-shrink-0 flex-wrap gap-1"> <div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div> </div> </div> </div> </div> </div><div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" data-set-theme="cupcake" data-act-class="outline"> <div data-theme="cupcake" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"> <div class="grid grid-cols-5 grid-rows-3"> <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"> <div class="flex-grow text-sm font-bold">cupcake</div> <div class="flex flex-shrink-0 flex-wrap gap-1"> <div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div> </div> </div> </div> </div> </div><div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" data-set-theme="bumblebee" data-act-class="outline"> <div data-theme="bumblebee" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"> <div class="grid grid-cols-5 grid-rows-3"> <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"> <div class="flex-grow text-sm font-bold">bumblebee</div> <div class="flex flex-shrink-0 flex-wrap gap-1"> <div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div> </div> </div> </div> </div> </div><div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" data-set-theme="emerald" data-act-class="outline"> <div data-theme="emerald" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"> <div class="grid grid-cols-5 grid-rows-3"> <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"> <div class="flex-grow text-sm font-bold">emerald</div> <div class="flex flex-shrink-0 flex-wrap gap-1"> <div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div> </div> </div> </div> </div> </div><div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" data-set-theme="corporate" data-act-class="outline"> <div data-theme="corporate" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"> <div class="grid grid-cols-5 grid-rows-3"> <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"> <div class="flex-grow text-sm font-bold">corporate</div> <div class="flex flex-shrink-0 flex-wrap gap-1"> <div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div> </div> </div> </div> </div> </div><div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" data-set-theme="synthwave" data-act-class="outline"> <div data-theme="synthwave" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"> <div class="grid grid-cols-5 grid-rows-3"> <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"> <div class="flex-grow text-sm font-bold">synthwave</div> <div class="flex flex-shrink-0 flex-wrap gap-1"> <div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div> </div> </div> </div> </div> </div><div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" data-set-theme="retro" data-act-class="outline"> <div data-theme="retro" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"> <div class="grid grid-cols-5 grid-rows-3"> <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"> <div class="flex-grow text-sm font-bold">retro</div> <div class="flex flex-shrink-0 flex-wrap gap-1"> <div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div> </div> </div> </div> </div> </div><div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" data-set-theme="cyberpunk" data-act-class="outline"> <div data-theme="cyberpunk" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"> <div class="grid grid-cols-5 grid-rows-3"> <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"> <div class="flex-grow text-sm font-bold">cyberpunk</div> <div class="flex flex-shrink-0 flex-wrap gap-1"> <div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div> </div> </div> </div> </div> </div><div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" data-set-theme="valentine" data-act-class="outline"> <div data-theme="valentine" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"> <div class="grid grid-cols-5 grid-rows-3"> <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"> <div class="flex-grow text-sm font-bold">valentine</div> <div class="flex flex-shrink-0 flex-wrap gap-1"> <div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div> </div> </div> </div> </div> </div><div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" data-set-theme="halloween" data-act-class="outline"> <div data-theme="halloween" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"> <div class="grid grid-cols-5 grid-rows-3"> <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"> <div class="flex-grow text-sm font-bold">halloween</div> <div class="flex flex-shrink-0 flex-wrap gap-1"> <div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div> </div> </div> </div> </div> </div><div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" data-set-theme="garden" data-act-class="outline"> <div data-theme="garden" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"> <div class="grid grid-cols-5 grid-rows-3"> <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"> <div class="flex-grow text-sm font-bold">garden</div> <div class="flex flex-shrink-0 flex-wrap gap-1"> <div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div> </div> </div> </div> </div> </div><div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" data-set-theme="forest" data-act-class="outline"> <div data-theme="forest" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"> <div class="grid grid-cols-5 grid-rows-3"> <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"> <div class="flex-grow text-sm font-bold">forest</div> <div class="flex flex-shrink-0 flex-wrap gap-1"> <div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div> </div> </div> </div> </div> </div><div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" data-set-theme="aqua" data-act-class="outline"> <div data-theme="aqua" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"> <div class="grid grid-cols-5 grid-rows-3"> <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"> <div class="flex-grow text-sm font-bold">aqua</div> <div class="flex flex-shrink-0 flex-wrap gap-1"> <div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div> </div> </div> </div> </div> </div><div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" data-set-theme="lofi" data-act-class="outline"> <div data-theme="lofi" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"> <div class="grid grid-cols-5 grid-rows-3"> <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"> <div class="flex-grow text-sm font-bold">lofi</div> <div class="flex flex-shrink-0 flex-wrap gap-1"> <div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div> </div> </div> </div> </div> </div><div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" data-set-theme="pastel" data-act-class="outline"> <div data-theme="pastel" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"> <div class="grid grid-cols-5 grid-rows-3"> <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"> <div class="flex-grow text-sm font-bold">pastel</div> <div class="flex flex-shrink-0 flex-wrap gap-1"> <div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div> </div> </div> </div> </div> </div><div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" data-set-theme="fantasy" data-act-class="outline"> <div data-theme="fantasy" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"> <div class="grid grid-cols-5 grid-rows-3"> <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"> <div class="flex-grow text-sm font-bold">fantasy</div> <div class="flex flex-shrink-0 flex-wrap gap-1"> <div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div> </div> </div> </div> </div> </div><div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" data-set-theme="wireframe" data-act-class="outline"> <div data-theme="wireframe" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"> <div class="grid grid-cols-5 grid-rows-3"> <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"> <div class="flex-grow text-sm font-bold">wireframe</div> <div class="flex flex-shrink-0 flex-wrap gap-1"> <div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div> </div> </div> </div> </div> </div><div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" data-set-theme="black" data-act-class="outline"> <div data-theme="black" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"> <div class="grid grid-cols-5 grid-rows-3"> <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"> <div class="flex-grow text-sm font-bold">black</div> <div class="flex flex-shrink-0 flex-wrap gap-1"> <div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div> </div> </div> </div> </div> </div><div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" data-set-theme="luxury" data-act-class="outline"> <div data-theme="luxury" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"> <div class="grid grid-cols-5 grid-rows-3"> <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"> <div class="flex-grow text-sm font-bold">luxury</div> <div class="flex flex-shrink-0 flex-wrap gap-1"> <div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div> </div> </div> </div> </div> </div><div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" data-set-theme="dracula" data-act-class="outline"> <div data-theme="dracula" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"> <div class="grid grid-cols-5 grid-rows-3"> <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"> <div class="flex-grow text-sm font-bold">dracula</div> <div class="flex flex-shrink-0 flex-wrap gap-1"> <div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div> </div> </div> </div> </div> </div><div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" data-set-theme="cmyk" data-act-class="outline"> <div data-theme="cmyk" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"> <div class="grid grid-cols-5 grid-rows-3"> <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"> <div class="flex-grow text-sm font-bold">cmyk</div> <div class="flex flex-shrink-0 flex-wrap gap-1"> <div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div> </div> </div> </div> </div> </div><div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" data-set-theme="autumn" data-act-class="outline"> <div data-theme="autumn" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"> <div class="grid grid-cols-5 grid-rows-3"> <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"> <div class="flex-grow text-sm font-bold">autumn</div> <div class="flex flex-shrink-0 flex-wrap gap-1"> <div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div> </div> </div> </div> </div> </div><div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" data-set-theme="business" data-act-class="outline"> <div data-theme="business" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"> <div class="grid grid-cols-5 grid-rows-3"> <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"> <div class="flex-grow text-sm font-bold">business</div> <div class="flex flex-shrink-0 flex-wrap gap-1"> <div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div> </div> </div> </div> </div> </div><div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" data-set-theme="acid" data-act-class="outline"> <div data-theme="acid" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"> <div class="grid grid-cols-5 grid-rows-3"> <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"> <div class="flex-grow text-sm font-bold">acid</div> <div class="flex flex-shrink-0 flex-wrap gap-1"> <div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div> </div> </div> </div> </div> </div><div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" data-set-theme="lemonade" data-act-class="outline"> <div data-theme="lemonade" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"> <div class="grid grid-cols-5 grid-rows-3"> <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"> <div class="flex-grow text-sm font-bold">lemonade</div> <div class="flex flex-shrink-0 flex-wrap gap-1"> <div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div> </div> </div> </div> </div> </div><div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" data-set-theme="night" data-act-class="outline"> <div data-theme="night" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"> <div class="grid grid-cols-5 grid-rows-3"> <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"> <div class="flex-grow text-sm font-bold">night</div> <div class="flex flex-shrink-0 flex-wrap gap-1"> <div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div> </div> </div> </div> </div> </div><div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" data-set-theme="coffee" data-act-class="outline"> <div data-theme="coffee" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"> <div class="grid grid-cols-5 grid-rows-3"> <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"> <div class="flex-grow text-sm font-bold">coffee</div> <div class="flex flex-shrink-0 flex-wrap gap-1"> <div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div> </div> </div> </div> </div> </div><div class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" data-set-theme="winter" data-act-class="outline"> <div data-theme="winter" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"> <div class="grid grid-cols-5 grid-rows-3"> <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"> <div class="flex-grow text-sm font-bold">winter</div> <div class="flex flex-shrink-0 flex-wrap gap-1"> <div class="bg-primary w-2 rounded"></div> <div class="bg-secondary w-2 rounded"></div> <div class="bg-accent w-2 rounded"></div> <div class="bg-neutral w-2 rounded"></div> </div> </div> </div> </div> <a class="outline-base-content overflow-hidden rounded-lg mt-3" href="https://daisyui.com/theme-generator/" target="_blank"><div class="hover:bg-neutral hover:text-neutral-content w-full cursor-pointer font-sans"> <div class="flex gap-2 p-3"> <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-current" viewBox="0 0 512 512"><path d="M96,208H48a16,16,0,0,1,0-32H96a16,16,0,0,1,0,32Z"></path><line x1="90.25" y1="90.25" x2="124.19" y2="124.19"></line><path d="M124.19,140.19a15.91,15.91,0,0,1-11.31-4.69L78.93,101.56a16,16,0,0,1,22.63-22.63l33.94,33.95a16,16,0,0,1-11.31,27.31Z"></path><path d="M192,112a16,16,0,0,1-16-16V48a16,16,0,0,1,32,0V96A16,16,0,0,1,192,112Z"></path><line x1="293.89" y1="90.25" x2="259.95" y2="124.19"></line><path d="M260,140.19a16,16,0,0,1-11.31-27.31l33.94-33.95a16,16,0,0,1,22.63,22.63L271.27,135.5A15.94,15.94,0,0,1,260,140.19Z"></path><line x1="124.19" y1="259.95" x2="90.25" y2="293.89"></line><path d="M90.25,309.89a16,16,0,0,1-11.32-27.31l33.95-33.94a16,16,0,0,1,22.62,22.63l-33.94,33.94A16,16,0,0,1,90.25,309.89Z"></path><path d="M219,151.83a26,26,0,0,0-36.77,0l-30.43,30.43a26,26,0,0,0,0,36.77L208.76,276a4,4,0,0,0,5.66,0L276,214.42a4,4,0,0,0,0-5.66Z"></path><path d="M472.31,405.11,304.24,237a4,4,0,0,0-5.66,0L237,298.58a4,4,0,0,0,0,5.66L405.12,472.31a26,26,0,0,0,36.76,0l30.43-30.43h0A26,26,0,0,0,472.31,405.11Z"></path></svg> <div class="flex-grow text-sm font-bold">Make your theme!</div> </div> </div></a> </div> </div> </div> </div> <script>\n  function setTheme(doc) {\n    const theme = window.localStorage.getItem("data-theme");\n\n    if (theme) {\n      updateTheme(doc, theme);\n    } else {\n      updateTheme(doc, "lofi");\n    }\n  }\n\n  function updateTheme(doc, newTheme) {\n    doc.querySelector("html").setAttribute("data-theme", newTheme);\n    window.localStorage.setItem("data-theme", newTheme);\n  }\n\n  function changeThemeBehavior(doc) {\n    const theme_selectors = doc.querySelectorAll(\n      "#theme-selector div[data-theme]"\n    );\n    theme_selectors.forEach((selector) => {\n      selector.addEventListener("click", () => {\n        updateTheme(doc, selector.getAttribute("data-theme"));\n      });\n    });\n  }\n\n  setTheme(document);\n  changeThemeBehavior(document);\n\n  document.addEventListener("astro:before-swap", (ev) => {\n    setTheme(ev.newDocument);\n  });\n\n  document.addEventListener("astro:after-swap", () =>\n    changeThemeBehavior(document)\n  );\n<\/script>'])), maybeRenderHead());
}, "/Users/juandelgadonivia/Documents/Portfolio/src/components/toggleTheme.astro", void 0);

const $$Astro$7 = createAstro();
const $$Navbar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Navbar;
  return renderTemplate`${maybeRenderHead()}<div class="navbar z-20 bg-base-300 sticky top-0"> <div class="navbar-start"> <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost lg:hidden"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg> </label> </div> <div class="navbar-center"> <a href="/" class="btn btn-ghost">Juan Pablo Delgado</a> </div> <div class="navbar-end"> ${renderComponent($$result, "ToggleTheme", $$ToggleTheme, {})} </div> </div>`;
}, "/Users/juandelgadonivia/Documents/Portfolio/src/components/navbar.astro", void 0);

const $$Astro$6 = createAstro();
const $$Social = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Social;
  return renderTemplate`${maybeRenderHead()}<div class="block sticky pointer-events-none bottom-10 bg-base-200 justify-center h-16 [mask-image:linear-gradient(transparent,#000000)]"></div> <div class="social-icons px-4 py-3 pt-1 flex justify-center bottom-0 sticky bg-base-200"> <a href="https://github.com/JuanPDN" target="_blank" class="mx-3" aria-label="Github" title="Github"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;transform: ;msFilter:;"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"></path> </svg> </a> <a href="https://www.linkedin.com/in/juan-pdn/" target="_blank" class="mx-3" aria-label="Linkedin" title="Linkedin"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;transform: ;msFilter:;"><circle cx="4.983" cy="5.009" r="2.188"></circle><path d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z"></path> </svg> </a> <a href="mailto:jpdelgado96@hotmail.com" target="_blank" class="mx-3" aria-label="send a mail" title="mail"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"> <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"></path> <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"></path> </svg> </a> </div>`;
}, "/Users/juandelgadonivia/Documents/Portfolio/src/components/social.astro", void 0);

const profile = new Proxy({"src":"/_astro/Juan Pablo Delgado 2.CjxqT-EN.jpeg","width":1600,"height":1066,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/juandelgadonivia/Documents/Portfolio/src/assets/Juan Pablo Delgado 2.jpeg";
							}
							
							return target[name];
						}
					});

const $$Astro$5 = createAstro();
const $$Avatar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Avatar;
  return renderTemplate`${maybeRenderHead()}<div class="avatar my-3 py-8 block"> <div class="mx-auto w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"> <a href="/"> ${renderComponent($$result, "Image", $$Image, { "class": "transition ease-in-out hover:scale-[105%]", "src": profile, "alt": "profile", "loading": "eager" })} </a> </div> </div>`;
}, "/Users/juandelgadonivia/Documents/Portfolio/src/components/avatar.astro", void 0);

const $$Astro$4 = createAstro();
const $$Sidebar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Sidebar;
  return renderTemplate`${maybeRenderHead()}<div class="drawer-side z-40"> <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label> <aside class="p-4 w-80 min-h-full bg-base-200"> ${renderComponent($$result, "Avatar", $$Avatar, {})} <ul class="menu menu-md grow shrink overflow-y-auto"> <div> <li><a href="/" class="py-3 text-base">Home</a></li> <li><a href="/projects" class="py-3 text-base">Projects</a></li> <li><a href="/blogs" class="py-3 text-base">Blogs</a></li> <li><a href="/cv" class="py-3 text-base">CV</a></li> <li> <a href="mailto:jpdelgado96@hotmail.com" class="py-3 text-base">Contact</a> </li> </div> </ul> ${renderComponent($$result, "Social", $$Social, {})} </aside> </div>`;
}, "/Users/juandelgadonivia/Documents/Portfolio/src/components/sidebar.astro", void 0);

const $$Astro$3 = createAstro();
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer class="footer footer-center block mb-5 pt-10"> <div class="pb-2">© 2024 Juan Pablo Delgado</div> <div class="inline opacity-75">
Developed by <a href="https://manuelernestog.github.io" target="_blank" class="font-bold">Juan Pablo Delgado</a> using
<a href="https://astrofy-template.netlify.app/" target="_blank" class="font-bold">Astro and Tailwind</a> </div> </footer>`;
}, "/Users/juandelgadonivia/Documents/Portfolio/src/components/footer.astro", void 0);

const $$Astro$2 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en" data-theme="winter"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> <div class="drawer lg:drawer-open"> <input id="my-drawer-3" type="checkbox" class="drawer-toggle"> <div class="drawer-content flex flex-col"> ${renderComponent($$result, "Navbar", $$Navbar, {})} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, {})} </div> ${renderComponent($$result, "SideBar", $$Sidebar, {})} </div> </body></html>`;
}, "/Users/juandelgadonivia/Documents/Portfolio/src/layouts/Layout.astro", void 0);

const $$Astro$1 = createAstro();
const $$Card = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Card;
  const { name, summary, ref, img } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="rounded-lg bg-base-200 hover:shadow-xl transition ease-in-out hover:scale-[102%]"> <a${addAttribute(ref, "href")} target="_blank"> <div class="hero-content flex-col md:flex-row"> <img${addAttribute(name, "alt")}${addAttribute(img, "src")} class="max-w-sm md:max-w-[13rem] rounded-lg shadow-2xl" loading="lazy" decoding="async"${addAttribute(name, "title")}> <div> <h1 class="text-3xl font-bold">${name}</h1> <p class="py-4">${summary}</p> <a target="_blank"${addAttribute(ref, "href")} class="btn btn-primary">See now</a> </div> </div> </a> </div> <div class="divider"></div>`;
}, "/Users/juandelgadonivia/Documents/Portfolio/src/components/card.astro", void 0);

const $$Astro = createAstro();
const $$Blogs = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Blogs;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blogs" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <div class="flex flex-col mx-8 my-8 items-center"> <div class="lg:max-w-[900px] p-6 pt-10 max-w-[100vw]"> <h2 class="text-3xl w-full mb-12 font-bold">Web Blogs${"</>"}</h2> ${renderComponent($$result2, "Card", $$Card, { "name": "Blog de Cafe", "summary": "A comprehensive coffee blog offering articles, reviews, brewing techniques, discussions about coffee culture, and courses for enthusiasts to deepen their knowledge and skills in the world of coffee.", "img": "src/assets/blog-cafe.png", "ref": "https://3rdsite.netlify.app" })} </div> </div> </main> ` })}`;
}, "/Users/juandelgadonivia/Documents/Portfolio/src/pages/blogs.astro", void 0);

const $$file = "/Users/juandelgadonivia/Documents/Portfolio/src/pages/blogs.astro";
const $$url = "/blogs";

const blogs = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blogs,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, $$Card as a, blogs as b, getConfiguredImageService as g, imageConfig as i };
