import { SubmitFeedbackService } from "./submit-feedback-service"

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
    { create: createFeedbackSpy},
    { sendMail: sendEmailSpy}
)

describe('Submit Feedback', () => {
    it('should be able to submit a feedback', async () =>{
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Exemple comment',
            screenshot: 'data:image/png;base64/sadfvyimw0dewufefnvuewjfigr',
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendEmailSpy).toHaveBeenCalled();
    });
    //Teste feedback type
    it('Should not be able to submit feedback without type', async () =>{
        await expect(submitFeedback.execute({
            type: '',
            comment: 'Exemple comment',
            screenshot: 'data:image/png;base64/sadfvyimw0dewufefnvuewjfigr',
        })).rejects.toThrow()
    });
    //Teste comentário
    it('Should not be able to submit feedback without comment', async () =>{
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64/sadfvyimw0dewufefnvuewjfigr',
        })).rejects.toThrow()
    });
    //Teste imagem
    it('Should not be able to submit feedback with an invalid screenshot', async () =>{
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Exemple comment',
            screenshot: 'data:image/sadfvyimw0dewufefnvuewjfigr',
        })).rejects.toThrow()
    });
});