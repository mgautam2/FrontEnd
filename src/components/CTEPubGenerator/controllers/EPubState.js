import { StateController } from 'utils/state-controller';
import { initialState } from '../redux/state';
// import Constants from './EPubConstants';

export default class EPubState extends StateController {
  constructor() {
    super();

    this.error = initialState.error;
    this.step = initialState.step;
    this.language = initialState.language;
    this.rawEPubData = initialState.rawEPubData;
    this.epubs = initialState.epubs;
    this.currEPubIndex = initialState.currEPubIndex;
    this.chapters = initialState.chapters;
    this.currChIndex = initialState.currChIndex;
    this.navId = initialState.navId;
    this.showNav = initialState.showNav;
    this.magnifiedImg = initialState.magnifiedImg;
    this.foldedIds = initialState.foldedIds;

    this.resetStates = this.resetStates.bind(this);
  }

  init(props) {
    const {
      setError,
      setStep,
      setLanguage,
      setRawEPubData,
      setEPubs,
      setCurrEPubIndex,
      setChapters,
      setCurrChIndex,
      setNavId,
      setShowNav,
      setMagnifiedImg,
      setFoldedIds,
      resetStates
    } = props;

    this.register({
      setError,
      setStep,
      setLanguage,
      setRawEPubData,
      setEPubs,
      setCurrEPubIndex,
      setChapters,
      setCurrChIndex,
      setNavId,
      setShowNav,
      setMagnifiedImg,
      setFoldedIds,
      resetStates
    });
  }

  setError(error) {
    this.setState('setError', 'error', error);
  }

  setStep(step) {
    this.setState('setStep', 'step', step);
  }

  setLanguage(language) {
    this.setState('setLanguage', 'language', language);
  }

  setRawEPubData(rawEPubData) {
    this.setState('setRawEPubData', 'rawEPubData', rawEPubData);
  }

  setEPubs(epubs) {
    this.setState('setEPubs', 'epubs', epubs);
  }

  setCurrEPubIndex(currEPubIndex) {
    this.setState('setCurrEPubIndex', 'currEPubIndex', currEPubIndex);
  }

  setChapters(chapters) {
    this.setState('setChapters', 'chapters', chapters);
  }

  setCurrChIndex(currChIndex) {
    this.setState('setCurrChIndex', 'currChIndex', currChIndex);
  }

  setNavId(navId) {
    this.setState('setNavId', 'navId', navId);
  }

  setMagnifiedImg(magnifiedImg) {
    this.setState('setMagnifiedImg', 'magnifiedImg', magnifiedImg);
  }

  setFoldedIds(foldedIds) {
    this.setState('setFoldedIds', 'foldedIds', foldedIds);
  }

  setShowNav(showNav) {
    this.setState('setShowNav', 'showNav', showNav);
  }

  updateContentChanges(chapters, currChIndex) {
    this.setChapters(chapters);
    this.setCurrChIndex(currChIndex);
  }

  resetStates() {
    const { resetStates } = this.dispatches;
    if (resetStates) {
      resetStates();
    }
  }
}

export const epubState = new EPubState();