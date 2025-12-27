const { readFile, writeFile, mkdir } = require('node:fs/promises');
const path = require('path');

async function loadDB(resourceName) {
    const filePath = path.join(__dirname, '..', '..', 'db', `${resourceName}.json`)
    try {
        const data = await readFile(filePath, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        if(error.code === 'ENOENT') {
            console.log(`File ${resourceName}.json không tồn tại, đang tạo mới...`);

            const dbDir = path.join(__dirname, '..', '..', 'db')
            await mkdir(dbDir, { recursive: true })
            const initialData = []
            await writeFile(filePath, JSON.stringify(initialData, null, 2), 'utf-8');

            return initialData
        }

        console.error('Lỗi khi đọc file:', error.message);
        return [];
    }
}

async function saveDB(resourceName, data) {
    const filePath = path.join(__dirname, '..', '..', 'db', `${resourceName}.json`)
    try {
        const dbDir = path.join(__dirname, '..', '..', 'db')
        await mkdir(dbDir, { recursive: true })

        const jsonString = JSON.stringify(data, null, 2)

        await writeFile(filePath, jsonString, 'utf-8');
    } catch (error) {
        console.error('Lỗi khi ghi file:', error.message);
        throw error;
    }
}

module.exports = { loadDB, saveDB }