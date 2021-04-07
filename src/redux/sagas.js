import { call, put, takeEvery } from "redux-saga/effects";
import { hideLoader, showLoader, showAlert } from "./actions";
import { FETCH_POSTS, REQUEST_POSTS } from "./types";

export function* sagaWatcher() {
  yield takeEvery(REQUEST_POSTS, sagaWorker);
}

function* sagaWorker() {
  try {
    yield put(showLoader());
    const payload = yield call(fetchPosts);
    yield put({ type: FETCH_POSTS, payload });
    yield put(hideLoader());

  } catch (error) {
    yield put(showAlert("Something wrong"));
    yield put(hideLoader());
  }

}

async function fetchPosts() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10"
  );
  return await response.json();
}
