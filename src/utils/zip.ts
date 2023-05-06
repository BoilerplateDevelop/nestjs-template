import { readdirSync, statSync, writeFileSync } from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
const AdmZip = require('adm-zip');

@Injectable()
export class FileSystem {
  getZippedFolderSync(inputPath, outputPath) {
    const allPaths = this.getFilePathsRecursiveSync(inputPath);
    const zip = new AdmZip();

    for (const filePath of allPaths) {
      zip.addLocalFile(filePath);
    }

    writeFileSync(outputPath, zip.toBuffer());

    return zip;
  }

  getFilePathsRecursiveSync(dir) {
    let results = [];
    const list = readdirSync(dir);
    const pending = list.length;
    if (!pending) return results;

    for (let file of list) {
      file = path.resolve(dir, file);
      const stat = statSync(file);
      if (stat && stat.isDirectory()) {
        const res = this.getFilePathsRecursiveSync(file);
        results = results.concat(res);
      } else {
        results.push(file);
      }
      if (pending) return results;
    }

    return results;
  }

  static createZipFolder(folderPath, outputFilePath) {
    const zip = new AdmZip();
    zip.addLocalFolder(folderPath);
    writeFileSync(outputFilePath, zip.toBuffer());
  }
}
