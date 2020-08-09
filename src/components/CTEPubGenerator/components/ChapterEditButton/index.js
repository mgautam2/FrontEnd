import React from 'react';
import cx from 'classnames';
import { useCustomizedButton } from 'hooks';
import './index.scss';

function ChapterEditButton({
  muted,
  children,
  attached,
  onClick,
  ...props
}) {
  const btnClasses = cx(
    'ct-epb', 'clickable', 'bordered', 'ch-edit-btn', 
    {
      'text-muted': muted
    },
    attached
  );

  const clickProps = useCustomizedButton(onClick);

  return (
    <div {...clickProps} {...props} className={btnClasses}>
      {children}
    </div>
  )
}

export default ChapterEditButton;
