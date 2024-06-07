import { Request, Response } from 'express'; // Asumiendo que estás utilizando Express
import FirebaseService from '../services/firebase/Firebase.service';


class FirebaseController {
    async uploadFile(req: Request, res: Response) {
        try {
            const file = req.file;
            if (!file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
    
            console.log('File name:', file.originalname);
            console.log('File type:', file.mimetype);
            const url = await FirebaseService.uploadFile("avatars", file);
            res.status(200).json({ url });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async deleteFile(req: Request, res: Response) {
        try {
            const { filePath } = req.params;
            await FirebaseService.deleteFile(filePath);
            res.status(200).json({ message: 'File deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async getFileURLsWithTypesInFolder(req: Request, res: Response) {
        try {
            const urlsWithType = await FirebaseService.getFileURLsWithTypesInFolder("avatars");
            res.status(200).json(urlsWithType);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}

export default new FirebaseController();
