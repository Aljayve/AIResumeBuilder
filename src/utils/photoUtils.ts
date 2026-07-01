export function removeBackground(img: HTMLImageElement): Promise<string> {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) { reject(new Error("Canvas not supported")); return; }
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        const corners = [
            { x: 0, y: 0 },
            { x: canvas.width - 1, y: 0 },
            { x: 0, y: canvas.height - 1 },
            { x: canvas.width - 1, y: canvas.height - 1 },
            { x: Math.floor(canvas.width / 2), y: 0 },
            { x: Math.floor(canvas.width / 2), y: canvas.height - 1 },
            { x: 0, y: Math.floor(canvas.height / 2) },
            { x: canvas.width - 1, y: Math.floor(canvas.height / 2) },
        ];

        let rSum = 0, gSum = 0, bSum = 0;
        for (const c of corners) {
            const idx = (c.y * canvas.width + c.x) * 4;
            rSum += data[idx];
            gSum += data[idx + 1];
            bSum += data[idx + 2];
        }
        const bgR = rSum / corners.length;
        const bgG = gSum / corners.length;
        const bgB = bSum / corners.length;

        const tolerance = 50;

        for (let i = 0; i < data.length; i += 4) {
            const dr = data[i] - bgR;
            const dg = data[i + 1] - bgG;
            const db = data[i + 2] - bgB;
            const dist = Math.sqrt(dr * dr + dg * dg + db * db);
            if (dist < tolerance) {
                data[i + 3] = 0;
            }
        }

        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL("image/png"));
    });
}

export function processPhotoBg(src: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => removeBackground(img).then(resolve).catch(reject);
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = src;
    });
}
