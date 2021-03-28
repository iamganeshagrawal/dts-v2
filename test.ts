import {path} from './src/deps.ts';

console.log(path.join("c:/windows/", "users/abc.txt"));
console.log(path.join("c:/windows/", "/users/abc.txt"));
console.log(path.join("c:/windows/", "./users/abc.txt"));
console.log(path.join("c:/windows/", "../users/abc.txt"));
console.log(path.join("c:/windows", "users/abc.txt"));
