import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'

// 引入reducers集合
import createRootReducer from './reducers'

// 利用redux-logger打印日志
import { createLogger } from 'redux-logger'

//安装redux-devtools-extension的可视化工具
import { composeWithDevTools } from 'redux-devtools-extension'
export const history = createBrowserHistory()
const composeEnhancers = process.env.NODE_ENV !== 'production' ? composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
}) : compose;

let middlewares = [routerMiddleware(history), thunk];

//非production环境打印控制台redux日志
if(process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger())
}

export default function configureStore(preloadedState?: any) {
    const store = createStore(
        createRootReducer(history), // root reducer with router state
        preloadedState,
        composeEnhancers(
            applyMiddleware(
                ...middlewares
                // ... other middlewares ...
            )
        ),
    )

    return store
}
