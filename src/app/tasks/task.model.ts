
export class Task {
  public title: string;
  public content: string;
  public assignee: string;
  public status: string;

  constructor(title: string, content: string, assignee: string, status: string) {
    this.title = title;
    this.content = content;
    this.assignee = assignee;
    this.status = status;
  }
}
