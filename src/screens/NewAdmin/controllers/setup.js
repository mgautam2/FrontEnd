import { api } from 'utils';
import { StateController } from 'utils/state-controller'

class SetupAdminPage extends StateController {
    init(props) {
        const { setOfferings } = props;

        this.register({ setOfferings });
    }

    offerings = []
    setOfferings(offerings) {
        this.setState('setOfferings', 'offerings', offerings);
    }
    universities = []
    setUniversities(universities) {
        this.setState('setUniversities', 'universities', universities);
    }
    async setupAdminPage() {
        let { data } = await api.getOfferingsByStudent();
        this.setOfferings(data);
        api.contentLoaded();
    }
}

export const setup = new SetupAdminPage();