import React from 'react';
import { Button, Message, Icon } from 'semantic-ui-react';
import EditIcon from '@material-ui/icons/Create';
import SingleButton from '../Components/SingleButton';

function UniversityListItem(props) {
    const {name, id, domain} = props;

    return (
      <Message>
        <div>
          <Message.Header>{name}</Message.Header>
          <Message.List items={[`Domain: ${domain}`]} role="list" />
        </div>
        <div className="create-new-button">
          <SingleButton text="Edit" icon={<EditIcon />} />
          {/* <Button
                    secondary
                    compact
                    to={`/admin/universities/id=${id}`}
                    title="Edit"
                    aria-label="Edit"
                >
                    <Icon name="edit" />
                    Edit
                </Button> */}
        </div>
      </Message>
    );
}

export default UniversityListItem;