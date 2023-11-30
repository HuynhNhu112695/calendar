import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from "./appReducer";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import serviceReducer from "./serviceReducer";
import scheduleReducer from "./scheduleReducer";
import bookingReducer from "./bookingReducer";
import taxReducer from "./taxReducer";
import salaryReducer from "./salaryReducer";
import calendarReducer from "./calendarReducer";

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfo']
};

const productPersistConfig = {
    ...persistCommonConfig,
    key: 'product',
    whitelist: ['products, productUpdate']
};

const servicePersistConfig = {
    ...persistCommonConfig,
    key: 'service',
    whitelist: ['services', 'serviceType']
};

const schedulePersistConfig = {
    ...persistCommonConfig,
    key: 'schedule',
    whitelist: ['schedules']
};

const bookingPersistConfig = {
    ...persistCommonConfig,
    key: 'booking',
    whitelist: ['bookings, callBooking']
};

const taxPersistConfig = {
    ...persistCommonConfig,
    key: 'tax',
    whitelist: ['taxs, taxNow']
};

const salaryPersistConfig = {
    ...persistCommonConfig,
    key: 'salary',
    whitelist: ['salarys']
};

const appPersistConfig = {
    ...persistCommonConfig,
    key: 'app',
    whitelist: ['language']
}
const calendarPersistConfig = {
    ...persistCommonConfig,
    key: 'calendar',
    whitelist: ['calendar', 'calendarDead']
};

export default (history) => combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    product: persistReducer(productPersistConfig, productReducer),
    service: persistReducer(servicePersistConfig, serviceReducer),
    schedule: persistReducer(schedulePersistConfig, scheduleReducer),
    booking: persistReducer(bookingPersistConfig, bookingReducer),
    tax: persistReducer(salaryPersistConfig, taxReducer),
    salary: persistReducer(salaryPersistConfig, salaryReducer),
    calendar: persistReducer(calendarPersistConfig, calendarReducer),
    app: persistReducer(appPersistConfig, appReducer)
})