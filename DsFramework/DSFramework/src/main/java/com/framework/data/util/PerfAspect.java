package com.framework.data.util;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

/**
 * 서비스 수행 시간 체크 (Spring AOP 구현)
 *
 */
@Component
@Aspect
public class PerfAspect {
	@Around("@annotation(PerfLogging)")
	public Object logPerf(ProceedingJoinPoint pjp) throws Throwable {
		long begin = System.currentTimeMillis();
		Object retValue = pjp.proceed();
		System.out.println("total performance millisecond :"+ (System.currentTimeMillis() - begin));
		return retValue;
	}
}
