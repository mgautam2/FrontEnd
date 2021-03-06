import React from 'react';
import cx from 'classnames';
import { CTText } from 'layout';
import { ChapterTitle } from '../../../components';
import { epub, getCompactText } from '../../../controllers';
import ChapterTitleButton from './ChapterTitleButton';
import EPubListItem from './EPubListItem';
import EPubSubChapterItem from './EPubSubChapterItem';

function EPubChapterItem({
  chapter,
  chapterIndex,
  foldedIds = [],
  canUndoSplit = false,
  canDisplayFull = false,
  setEPubItem,
  onFold,
  dispatch
}) {
  const undoSplitChapter = () => dispatch({
    type: 'epub/updateEpubData', payload: {
      action: 'undoSplitChapter', payload: { chapterIdx: chapterIndex }
    }
  })
  const appendChapterAsSubChapter = () => dispatch({
    type: 'epub/updateEpubData', payload: {
      action: 'appendChapterAsSubChapter', payload: { chapterIdx: chapterIndex }
    }
  })
  const handleMouseOverChapterList = () => null// epub.data.handleMouseOverChapterList(chapter);

  const saveChapterTitle = value =>
    dispatch({
      type: 'epub/updateEpubData', payload: {
        action: 'saveChapterTitle', payload: { chapterIdx: chapterIndex, value }
      }
    })

  const isFolded = foldedIds.includes(chapter.id);

  const chClasses = cx('ct-epb', 'sch', 'ch-item', 'ct-d-c', { fold: isFolded });

  const itemsToDisplay = canDisplayFull ? chapter.items : chapter.items.slice(0, 3)

  return (
    <div
      id={epub.id.chID(chapter.id)}
      className={chClasses}
      onMouseEnter={handleMouseOverChapterList}
    >
      <CTText muted className="pt-2 pl-2">Chapter {chapterIndex + 1}: {chapter.title}</CTText>
      <div className="ch-item-title-con ct-d-r-center-v">
        <ChapterTitle
          id={epub.id.chTitleID(chapter.id)}
          value={chapter.title}
          onSave={saveChapterTitle}
          headingType="h2"
          className="ch-item-title"
        />

        <ChapterTitleButton
          show
          content={isFolded ? 'Expand' : 'Collapse'}
          color="transparent"
          icon={isFolded ? "expand_more" : "expand_less"}
          className="ch-item-expand-btn"
          outlined={false}
          onClick={() => onFold(!isFolded, chapter.id)}
        />

        <ChapterTitleButton
          show={canUndoSplit}
          content="Undo split"
          icon="unfold_less"
          className="ch-item-act-btn"
          onClick={undoSplitChapter}
        />

        <ChapterTitleButton
          show={canUndoSplit}
          content="As a Sub-Chapter"
          icon="chevron_right"
          className="ch-item-act-btn padded-1"
          onClick={appendChapterAsSubChapter}
        />
      </div>

      {
        isFolded
          ?
            <CTText line={2} className="ch-item-compact-txt">
              {getCompactText(chapter)}
            </CTText>
            :
            <>
              <div className="ch-item-ol ct-d-c">
                {itemsToDisplay.map((item, itemIndex) => (
                  <EPubListItem
                    key={item.id}
                    item={item}
                    itemIndex={itemIndex}
                    chapterIndex={chapterIndex}
                    canSplit={itemIndex > 0}
                    canSubdivide
                    setEPubItem={setEPubItem}
                  />
                ))}
              </div>

              <div className="ch-item-ol ct-d-c">
                {chapter.subChapters.map((subChapter, subChapterIndex) => (
                  <EPubSubChapterItem
                    key={subChapter.id}
                    foldedIds={foldedIds}
                    subChapter={subChapter}
                    chapterIndex={chapterIndex}
                    subChapterIndex={subChapterIndex}
                    canUndoSubdivide={subChapterIndex === 0}
                    canUndoSplitSubChapter={subChapterIndex > 0}
                    canSplitAsNewChapter={chapter.items.length > 0 || subChapterIndex > 0}
                    setEPubItem={setEPubItem}
                    onFold={onFold}
                    dispatch={dispatch}
                  />
                ))}
              </div>
            </>
      }

    </div>
  );
}

export default EPubChapterItem;