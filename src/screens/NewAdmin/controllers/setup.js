import { api } from 'utils';
import { StateController } from 'utils/state-controller'

class SetupAdminPage extends StateController {
    init(props) {
        const { setUniversities, setTerms } = props;

        this.register({setUniversities, setTerms});
    }
    async getUniversities() {
        try {
            const { data } = await api.getUniversities();
            return data;
        } catch (error) {
            return [];
        }    
    }
    universities = []
    setUniversities(universities) {
        this.setState('setUniversities', 'universities', universities);
    }
    terms = []
    setTerms(terms) {
        this.setState('setTerms', 'terms', terms);
    }
    async setupAdminPage() {
        let data = this.getUniversities();
        this.setUniversities(data);
        api.contentLoaded();
    }
}

export const setup = new SetupAdminPage();