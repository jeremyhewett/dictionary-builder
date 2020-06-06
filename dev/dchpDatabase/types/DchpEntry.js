const Headword = require('../../server/database/types/Headword');
const Entry = require('../../server/database/types/Entry');
const SpellingVariant = require('../../server/database/types/SpellingVariant');

class DchpEntry {
  static get table() { return 'det_entries'; }

  constructor(entity = {}) {
    this.id = entity.id;
    this.headword = entity.headword;
    this.firstField = entity.firstField;
    this.etymology = entity.etymology;
    this.isLegacy = entity.isLegacy;
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

  toHeadword() {
    return new Headword({
      headword: this.headword
    });
  }

  toSpellingVariants(headword) {
    if (!this.spellingVariants) return [];
    return this.spellingVariants
      .split(',')
      .map(x => new SpellingVariant({
        headwordId: headword.id,
        spellingVariant: x.trim()
      }))
      .filter(x => x.spellingVariant);
  }

  toEntry(headword, user) {
    return new Entry({
      headwordId: headword.id,
      firstField: this.firstField || null,
      etymology: this.etymology || null,
      isPublic: !!this.isPublic,
      superscript: this.superscript || null,
      isArchaic: !!this.dagger,
      generalLabels: this.generalLabels || null,
      proofingStatus: this.proofingStatus,
      proofingUserId: user.id,
      fistNote: this.fistNote || null,
      imageFileName: this.imageFileName || null,
      comment: this.comment || null,
      firstDraft: !!this.firstDraft,
      revisedDraft: !!this.revisedDraft,
      semanticallyRevised: !!this.semanticallyRevised,
      editedForStyle: !!this.editedForStyle,
      proofread: !!this.proofread,
      chiefEditorOk: !!this.chiefEditorOk,
      finalProofing: !!this.finalProofing,
      editStatusComment: this.editStatusComment || null,
    });
  }
}

module.exports = DchpEntry;
