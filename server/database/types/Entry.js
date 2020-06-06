
class Entry {
  constructor(entity = {}) {
    this.id = entity.id;
    this.headwordId = entity.headwordId;
    this.firstField = entity.firstField;
    this.etymology = entity.etymology;
    this.isPublic = entity.isPublic;
    this.superscript = entity.superscript;
    this.isArchaic = entity.isArchaic;
    this.generalLabels = entity.generalLabels;
    this.proofingStatus = entity.proofingStatus;
    this.proofingUserId = entity.proofingUserId;
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

  percentageComplete() {
    let stages = [
      'firstDraft',
      'revisedDraft',
      'semanticallyRevised',
      'editedForStyle',
      'proofread',
      'chiefEditorOk',
      'finalProofing'
    ];
    let stageNumber = stages.map(stage => !!this[stage]).lastIndexOf(true) + 1;
    return stageNumber * 100 / stages.length;
  }
}

module.exports = Entry;
