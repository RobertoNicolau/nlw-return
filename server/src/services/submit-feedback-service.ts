import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedback-repository";

interface SubmitFeedbackServiceRequest{
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackService{
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter,
    ){}

    async execute(request: SubmitFeedbackServiceRequest){
        const { type, comment, screenshot } = request;

        if(!type){
            throw Error('Type is required.')
        }
        if(!comment){
            throw Error('Comment is required.')
        }

        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error('Invalid screenshot format.')
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        })
        await this.mailAdapter.sendMail({
            subject: 'Novo Feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #222;">`,
                `<p>Tipo do Feedback ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                `</div>`,
            screenshot ? `<img src="${screenshot}/>` : null,
            ].join('')
        })
    }
}