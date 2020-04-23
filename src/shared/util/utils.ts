import * as mv from 'mv';
import * as mkdirp from 'mkdirp';
import * as rimraf from 'rimraf';
// import { Vec3 } from 'opencv4nodejs';

export function objectIdEquals(oid1, oid2) {
    return String(oid1) === String(oid2);
}

export function moveFile(from, to) {
    return new Promise((resolve, reject) => {
        mv(from, to, { mkdirp: true }, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export function makeFolders(path: string) {
    return new Promise((resolve, reject) => {
        mkdirp(path, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export function hexToRgb(hex: string) {
    var bigint = parseInt(hex.replace('#', ''), 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return [r, g, b];
}

// export function hexToBgrVec3(hex: string) {
//     const [r, g, b] = hexToRgb(hex);
//     return new Vec3(b, g, r);
// }


export function safeDelete(path) {
    try {
        rimraf(path, { glob: false }, function () { });
    } catch (e) {
        console.log(e);
    }
}
