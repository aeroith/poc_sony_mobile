import _ from 'lodash';
import { counterInitialState } from '../reducers/counter';
import { navInitialState } from '../reducers/nav';

const createAppInitialState = () => {
    const state = {
        counter: _.cloneDeep(counterInitialState),
        nav: _.cloneDeep(navInitialState)
    }
    return state;
};

export { createAppInitialState };