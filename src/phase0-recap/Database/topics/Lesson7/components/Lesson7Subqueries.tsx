'use client';

import React from 'react';
import SubqueryFlowSection from './subqueries/SubqueryFlowSection';
import SubqueryTypesSection from './subqueries/SubqueryTypesSection';
import SubqueryOperatorsSection from './subqueries/SubqueryOperatorsSection';
import AnyAllOperatorsSection from './subqueries/AnyAllOperatorsSection';
import CorrelatedSubquerySection from './subqueries/CorrelatedSubquerySection';

export default function Lesson7Subqueries() {
  return (
    <>
      <SubqueryFlowSection />
      <SubqueryTypesSection />
      <SubqueryOperatorsSection />
      <AnyAllOperatorsSection />
      <CorrelatedSubquerySection />
    </>
  );
}
