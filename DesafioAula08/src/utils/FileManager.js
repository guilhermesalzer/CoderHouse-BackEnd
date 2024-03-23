import { promises } from "fs";

class FileManager {
  readFile = async (path, limit = null) => {
    if (limit) {
      const objects = JSON.parse(await promises.readFile(path));
      return objects.slice(0, limit);
    }

    return JSON.parse(await promises.readFile(path));
  };
  createFile = async (path) => await promises.writeFile(path, "");
  insertFile = async (path, data) =>
    await promises.appendFile(path, JSON.stringify(data));
  deleteFile = async (path) => await promises.unlink(path);
  updateFile = async (path, data) => {
    await this.deleteFile(path);
    await this.createFile(path);
    await this.insertFile(path, data);
  };
}

export default FileManager;
