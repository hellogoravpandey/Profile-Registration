const fs = require("fs/promises");

async function cleanupFiles(req) {
    try {
        // upload.single()
        if (req.file) {
            await fs.unlink(req.file.path);
        }
        // upload.fields()  /upload.array()
        if (req.files) {
            for (const files of Object.values(req.files)) {
                for (const file of files) {
                    await fs.unlink(file.path);
                }
            }
        }
    } catch (err) {
        // Ignore cleanup failures
        console.error("Cleanup Error:", err.message);
    }

}

module.exports = {cleanupFiles};