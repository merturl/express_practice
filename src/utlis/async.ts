import { Request, Response, NextFunction } from "express";

function wrapAsync(fn: Function) {
  return function (request: Request, response: Response, next: NextFunction) {
    // 모든 오류를 .catch() 처리하고 체인의 next() 미들웨어에 전달하세요
    // (이 경우에는 오류 처리기)
    fn(request, response, next).catch(next);
  };
}

export default wrapAsync;
