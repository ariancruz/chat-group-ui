import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Message} from '../models';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messagesList = signal<Message[]>([
    {_id: '1', text: 'buscando a nemo', type: 'req', user: 'Arian', date: new Date()},
    {_id: '2', text: 'Claro, aquí te presento una guía completa sobre cómo integrar la API de Gemini con tu aplicación NestJS:', type: 'res', user: 'Arian', date: new Date()},
  ])

  private readonly http = inject(HttpClient);

  send(message: string): void {
      //this.http.post(``, {})
  }
}
