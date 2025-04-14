export function reconstructHtmlFromMessage(message: string, entities: any[]) {
    if (!entities || entities.length === 0) return message;
  
    let result = "";
    let lastOffset = 0;
  
    for (const entity of entities) {
      const { offset, length, url, className } = entity;
      const textBefore = message.slice(lastOffset, offset);
      const entityText = message.slice(offset, offset + length);
  
      result += textBefore;
  
      if (className === "MessageEntityTextUrl" && url) {
        result += `<a href="${url}">${entityText}</a>`;
      } else {
        result += entityText;
      }
  
      lastOffset = offset + length;
    }
  
    result += message.slice(lastOffset);
    return result;
  }