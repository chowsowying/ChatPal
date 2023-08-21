export const getFileType = (file) => {
  switch (file) {
    case "application/pdf":
      return "PDF";
    case "text/plain":
      return "TXT";
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return "DOCX";
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return "XLSX";
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      return "PPTX";
    case "application/vnd.ms-powerpoint":
      return "PPT";
    case "application/vnd.ms-excel":
      return "XLS";
    case "application/msword":
      return "DOC";
    case "application/vnd.rar":
      return "RAR";
    case "application/zip":
      return "ZIP";
    case "image/jpeg":
      return "IMAGE";
    case "image/png":
      return "IMAGE";
    case "image/gif":
      return "IMAGE";
    case "image/webp":
      return "IMAGE";
    case "video/mp4":
      return "VIDEO";
    case "video/ogg":
      return "VIDEO";
    case "video/wav":
      return "VIDEO";
    case "video/mov":
      return "VIDEO";
    default:
      return "FILE";
  }
};
