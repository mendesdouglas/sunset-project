import {Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createClients, getAllClients, getClientsByEmail, updateClient, deleteClient } from '../models/clients';
      

export const getClients = async (req: Request, res: Response) => {
    try {
      const clients = await getAllClients();
      console.log('teste')
      res.json(clients);
    } catch (e) {
        const error = e as Error;
      res.status(500).json({ error: error.message });
    }
  };

export const addClient = async ( req: Request, res: Response) => {
    const errors = validationResult(req);
       if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
       }

    const {name, address, city, state, zip, email, phone } = req.body;
    try {
        const verifiedEmail  = await VerifyUniqueEmail(email);
        
        if(verifiedEmail) {
             throw new Error ('E-mail already registered')
        }else{
            const client = await createClients({name, email, address, city, state, zip, phone});
            res.json(client);
        }
    }catch(err){
        const error = err as Error;
        res.status(500).json({error: error.message});
    }
}

export const updateClientById = async ( req: Request, res: Response) => {
    const errors = validationResult(req);
       if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
       }
       console.log('update')
    
       const { id } = req.params;
       const {name, address, city, state, zip, phone } = req.body;

    try {
        const client = await updateClient(parseInt(id, 10),{name, address, city, state, zip, phone});
        res.json(client);
    }catch(err){
        const error = err as Error;
        res.status(500).json({error: error.message});
    }
}

export const deleteClientById = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log('delete')
    try {
      const client = await deleteClient(parseInt(id, 10));
      res.json(client);
    } catch (e) {
      const error = e as Error;
      res.status(500).json({ error: error.message });
    }
  };

export const VerifyUniqueEmail = async ( email:string) => {
    try {
        const uniqueEmail = await getClientsByEmail(email);
        return uniqueEmail;
    } catch(err){
        const error = err as Error;
        throw new Error ("An error has occurred");
    }
}


