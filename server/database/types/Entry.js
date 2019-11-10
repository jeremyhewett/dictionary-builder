
class Entry {
  constructor(entity = {}) {
    this.id = entity.id;
    this.headwordId = entity.headwordId;
    this.firstField = entity.firstField;
    this.etymology = entity.etymology;
    this.isPublic = entity.isPublic;
    this.spellingVariants = entity.spellingVariants;
    this.superscript = entity.superscript;
    this.dagger = entity.dagger;
    this.generalLabels = entity.generalLabels;
    this.proofingStatus = entity.proofingStatus;
    this.proofingUser = entity.proofingUser;
    this.fistNote = entity.fistNote;
    this.imageFileName = entity.imageFileName;
    this.comment = entity.comment;
    this.firstDraft = entity.firstDraft;
    this.revisedDraft = entity.revisedDraft;
    this.semanticallyRevised = entity.semanticallyRevised;
    this.editedForStyle = entity.editedForStyle;
    this.proofread = entity.proofread;
    this.chiefEditorOk = entity.chiefEditorOk;
    this.finalProofing = entity.finalProofing;
    this.editStatusComment = entity.editStatusComment;
  }
}

module.exports = Entry;
