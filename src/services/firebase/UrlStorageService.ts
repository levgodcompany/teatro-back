// src/UrlStorageService.ts
class UrlStorageService {
    private urls: { [id: string]: string } = {};

    saveUrl(id: string, url: string): void {
        this.urls[id] = url;
    }

    getUrl(id: string): string | undefined {
        return this.urls[id];
    }

    updateUrl(id: string, url: string): boolean {
        if (this.urls[id]) {
            this.urls[id] = url;
            return true;
        }
        return false;
    }

    deleteUrl(id: string): boolean {
        if (this.urls[id]) {
            delete this.urls[id];
            return true;
        }
        return false;
    }
}

export default UrlStorageService;
