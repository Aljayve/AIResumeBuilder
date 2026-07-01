interface Props {
    previewRef: React.RefObject<HTMLDivElement | null>;
}

export default function ExportPDFButton({ previewRef }: Props) {
    const handlePrint = () => {
        const content = previewRef.current;
        if (!content) return;

        const templateEl = content.querySelector('[data-print-root]');
        if (!templateEl) return;

        const printWindow = window.open("", "_blank");
        if (!printWindow) return;

        const styles = Array.from(document.querySelectorAll("style, link[rel='stylesheet']"))
            .map((el) => el.outerHTML)
            .join("");

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Resume</title>
                    ${styles}
                    <style>
                        @page { margin: 0; size: A4; }
                        body { 
                            color-adjust: exact; 
                            print-color-adjust: exact; 
                            -webkit-print-color-adjust: exact; 
                            margin: 0; 
                            padding: 0;
                            font-size: 11px;
                        }
                        * { 
                            box-sizing: border-box; 
                            box-shadow: none !important; 
                        }
                        img { display: block; }
                    </style>
                </head>
                <body>${templateEl.innerHTML}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();

        const imgInterval = setInterval(() => {
            const imgs = printWindow.document.querySelectorAll("img");
            const allLoaded = Array.from(imgs).every((img) => img.complete);
            if (allLoaded || imgs.length === 0) {
                clearInterval(imgInterval);
                printWindow.print();
            }
        }, 300);
    };

    return (
        <button
            onClick={handlePrint}
            className="w-full rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
        >
            Export PDF
        </button>
    );
}
