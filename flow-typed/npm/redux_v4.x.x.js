declare module "redux" {
  /*
    S = State
    A = Action
  */

  /* NEW: We create a few extra action and dispatch types */
  declare type ThunkAction<S, R> = (
    dispatch: Dispatch<S, any>,
    getState: () => S
  ) => R
  declare type PromiseAction<R> = { type: string, payload: Promise<R> }
  declare type ThunkDispatch<S> = <R>(action: ThunkAction<S, R>) => R
  declare type PromiseDispatch = <R>(action: PromiseAction<R>) => Promise<R>
  declare type PlainDispatch<A: { type: $Subtype<string> }> = (action: A) => A
  /* NEW: Dispatch is now a combination of these different dispatch types */
  declare type Dispatch<S, A> = PlainDispatch<A> &
    ThunkDispatch<S> &
    PromiseDispatch

  declare type MiddlewareAPI<S, A> = {
    dispatch: Dispatch<S, A>,
    getState(): S,
  }

  declare type Store<S, A> = {
    // rewrite MiddlewareAPI members in order to get nicer error messages (intersections produce long messages)
    dispatch: Dispatch<S, A>,
    getState(): S,
    subscribe(listener: () => void): () => void,
    replaceReducer(nextReducer: Reducer<S, A>): void,
  }

  declare type Reducer<S, A> = (state: S, action: A) => S

  declare type Middleware<S, A> = (
    api: MiddlewareAPI<S, A>
  ) => (next: Dispatch<S, A>) => Dispatch<S, A>

  declare type StoreCreator<S, A> = {
    (reducer: Reducer<S, A>, enhancer?: StoreEnhancer<S, A>): Store<S, A>,
    (
      reducer: Reducer<S, A>,
      preloadedState: S,
      enhancer?: StoreEnhancer<S, A>
    ): Store<S, A>,
  }

  declare type StoreEnhancer<S, A> = (
    next: StoreCreator<S, A>
  ) => StoreCreator<S, A>

  declare function createStore<S, A>(
    reducer: Reducer<S, A>,
    enhancer?: StoreEnhancer<S, A>
  ): Store<S, A>
  declare function createStore<S, A>(
    reducer: Reducer<S, A>,
    preloadedState: S,
    enhancer?: StoreEnhancer<S, A>
  ): Store<S, A>

  declare function applyMiddleware<S, A>(
    ...middlewares: Array<Middleware<S, A>>
  ): StoreEnhancer<S, A>

  declare type ActionCreator<A, B> = (...args: Array<B>) => A
  declare type ActionCreators<K, A> = { [key: K]: ActionCreator<A, any> }

  declare function bindActionCreators<S, A, C: ActionCreator<A, any>>(
    actionCreator: C,
    dispatch: Dispatch<S, A>
  ): C
  declare function bindActionCreators<S, A, K, C: ActionCreators<K, A>>(
    actionCreators: C,
    dispatch: Dispatch<S, A>
  ): C

  declare function combineReducers<O: Object, A>(
    reducers: O
  ): Reducer<$ObjMap<O, <S>(r: Reducer<S, any>) => S>, A>

  declare function compose<S, A>(...fns: Array<StoreEnhancer<S, A>>): Function
}
