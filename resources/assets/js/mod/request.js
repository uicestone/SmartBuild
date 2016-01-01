import _ from 'lodash'
import {Data as createData} from '../data/createData'
import {Data as casesData} from '../data/casesData'

class Request {
	getCreateData () {
        return createData
    }
    getCasesData () {
		return casesData
	}

}


export default new Request

