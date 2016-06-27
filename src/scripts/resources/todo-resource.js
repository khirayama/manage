import MicroResource from './micro-resource';

export class TodoResource extends MicroResource {
  constructor(options) {
    super(options);
    this.defaults = {
      text: '',
      completed: false,
      categoryId: null,
      order: null,
    };
  }
}
export default new TodoResource();
