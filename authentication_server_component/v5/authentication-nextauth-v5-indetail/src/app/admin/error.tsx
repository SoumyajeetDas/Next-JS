'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import React from 'react';

const Error = () => {
  return (
    <>
      <div className="w-[100%] h-[100vh] flex items-center justify-center">
        <Card className="w-400px]">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Either something went wrong or you are not authorized to view this
              page.
            </AlertDescription>
          </Alert>
        </Card>
      </div>
    </>
  );
};

export default Error;
