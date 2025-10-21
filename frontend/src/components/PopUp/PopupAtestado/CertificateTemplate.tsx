import React from 'react';

interface CertificateTemplateProps {
  patientName: string;
  patientCpf: string;
  doctorName: string;
  crm: string;
  date: string;
  reason: string;
  days: string;
  cid: string;
}

export const CertificateTemplate = React.forwardRef<
  HTMLDivElement,
  CertificateTemplateProps
>(
  (
    { patientName, patientCpf, doctorName, crm, date, reason, days, cid },
    ref
  ) => {
    return (
      <div ref={ref} className="p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Atestado Médico</h1>
        </div>
        <div className="text-justify">
          <p>
            Atesto, para os devidos fins, que o(a) Sr(a).{' '}
            <strong>{patientName}</strong>, portador(a) do CPF{' '}
            <strong>{patientCpf}</strong>, necessita de <strong>{days}</strong>{' '}
            de afastamento de suas atividades laborais/escolares a partir de{' '}
            <strong>{date}</strong>, por motivos de saúde.
          </p>
          <p className="mt-4">
            CID: <strong>{cid}</strong>
          </p>
          <p className="mt-4">{reason}</p>
        </div>
        <div className="text-center mt-16">
          <p>_________________________________________</p>
          <p>
            <strong>Dr(a). {doctorName}</strong>
          </p>
          <p>CRM/UF: {crm}</p>
        </div>
        <div className="text-center mt-8">
          <p>Carimbo e Assinatura do Médico</p>
        </div>
      </div>
    );
  }
);

CertificateTemplate.displayName = 'CertificateTemplate';
