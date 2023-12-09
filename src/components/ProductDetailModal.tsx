/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { DateTime } from 'luxon';
import classNames from 'classnames';
import {
  DButton,
  DModal,
  DModalBody,
  DModalHeader,
  ModalProps,
  useFormatCurrency,
} from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

// import { FORMAT_DATE } from '../config/widgetConfig';
// import { ActivityStatus } from '../services/config';

export default function ProductDetailModal(
  {
    payload: {
      content,
    },
    closeModal,
  }: ModalProps,
) {
//   const formatCurrency = useFormatCurrency();
  const { t } = useTranslation();
  // const { description } = useContentEffect(1450);

  return (
    <DModal
      className="activity-detail-modal d-block"
      name="modal"
      isCentered
    >
      <DModalHeader
        onClose={() => closeModal()}
        showCloseButton
      >
        <h5 className="fw-bold flex-grow-1 activity-name text-wrap">
          {content.name}
        </h5>
      </DModalHeader>
      <DModalBody>
        <div className="d-flex flex-column gap-4">
          <div className="bg-light rounded-1 p-3">
            <div className="d-flex flex-column gap-1">
              <div className="d-flex align-items-center gap-1">
                {/* <span className="fw-bold">
                  {t('modal.details.value')}
                  :
                </span> */}
                {/* <span
                  className={classNames(
                    'flex-grow-1',
                    activity.amount > 0 ? 'text-success' : 'text-danger',
                  )}
                >
                  {formatCurrency.format(activity.amount as number)}
                </span> */}
                {/* {content.description} */}
              </div>
              <div className="d-flex align-items-center gap-1">
                {/* <span className="fw-bold">
                  {t('modal.details.paymentDate')}
                  :
                </span> */}
                {/* <span className="flex-grow-1">
                  {DateTime.fromISO(activity.date as string).toFormat(FORMAT_DATE)}
                </span> */}
              </div>
              <div className="d-flex align-items-center gap-1">
                {/* <span className="fw-bold">
                  {t('modal.details.status')}
                  :
                </span> */}
                {/* {activity.status && (
                  <span className="flex-grow-1">
                    {t(`modal.status.${activity.status as ActivityStatus}`)}
                  </span>
                )} */}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <DButton
              text={t('modal.actions.accept')}
              onClick={() => closeModal()}
              isPill
            />
          </div>
        </div>
      </DModalBody>
    </DModal>
  );
}