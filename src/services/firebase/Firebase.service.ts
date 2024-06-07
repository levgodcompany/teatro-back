import { initializeApp } from 'firebase/app';
import { uploadBytes, getDownloadURL, deleteObject, getMetadata, listAll, getStorage, ref } from 'firebase/storage';
import { v4 } from 'uuid';

class FirebaseService {
    private storage;

    constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyDNXlICWQ-kjA-dvXTsxFPjpjg6qhpiTC4",
            authDomain: "in-english-baeee.firebaseapp.com",
            projectId: "in-english-baeee",
            storageBucket: "in-english-baeee.appspot.com",
            messagingSenderId: "952103524647",
            appId: "1:952103524647:web:2079b6f0e7f8d34634b102"
        };
        const app = initializeApp(firebaseConfig);
        this.storage = getStorage(app);
    }

    async uploadFile(folder: string, file: Express.Multer.File): Promise<string> {
        console.log("file.mimetype", file.mimetype)
        const storageRef = ref(this.storage, `${folder}/${v4()}__${file.originalname}`);
        const snapshot = await uploadBytes(storageRef, file.buffer);
        const url = await getDownloadURL(snapshot.ref);
        return url;
    }

    async deleteFile(filePath: string): Promise<void> {
        const fileRef = ref(this.storage, filePath);
        await deleteObject(fileRef);
    }

    async getFileURLsWithTypesInFolder(folder: string): Promise<{ url: string, type: string }[]> {
        const folderRef = ref(this.storage, folder);
        const files = await listAll(folderRef);
        const urlsWithType = await Promise.all(files.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            const metadata = await getMetadata(itemRef);
            const type = metadata.contentType ? metadata.contentType : "-" ;
            return { url, type };
        }));

        return urlsWithType;
    }
}

export default new FirebaseService;
