import { Col, Row } from 'antd';
import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import CustomField from '../../../components/Admin/CustomField/index';
import { tagCreate, getTagDetail, updateTag } from '../../../redux/actions';
import history from '../../../util/history';

const TagCreate = ({ tagCreate, tagDetail, match, getTagDetail, updateTag }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const tagId = match.params.id;
  const tagDetailEdit = tagDetail?.data?.tag;

  console.log(location.pathname);

  useEffect(() => {
    document.title = 'Vegana | Thêm thẻ sản phẩm';

    if (location.pathname.indexOf(`edit`) !== -1) {
      getTagDetail(tagId);
    }
  }, [getTagDetail, location.pathname, tagId]);

  const handleCreateTag = (values) => {
    tagCreate({ ...values });
  };

  const handleEditTag = (values) => {
    const data = {
      id: tagId,
      ...values,
    };
    updateTag({ ...data });
  };

  return (
    <section className="addProductAdmin">
      <Row justify="center">
        <Col xs={18}>
          <div className="addProductAdmin__container container">
            <h1 className="addProductAdmin__title">{t('admin.add_tag_title')}</h1>
            <Formik
              initialValues={{
                tagId: location.pathname.indexOf(`edit`) !== -1 ? tagId : '',
                name: location.pathname.indexOf(`edit`) !== -1 ? tagDetailEdit?.name : '',
              }}
              onSubmit={(values) => {
                if (location.pathname !== `/admin/tag/edit/${tagId}`) {
                  handleCreateTag(values);
                } else handleEditTag(values);
              }}
              enableReinitialize
            >
              <Form>
                <Row gutter={[24, 16]}>
                  <Col xs={24}>
                    <CustomField
                      name="name"
                      type="text"
                      label={t('admin.name')}
                      placeholder={t('admin.tag_placeholder')}
                      required
                    />
                  </Col>
                  <Col xs={24} className="admin__wrapper--button">
                    <Row justify="end" align="middle">
                      <button
                        type="button"
                        className="button button-round--lg button-primary button-back"
                        onClick={() => history.push('/admin/tag')}
                      >
                        {t('admin.Back')}
                      </button>
                    </Row>
                    <Row justify="end" align="middle">
                      <button type="submit" className="button button-round--lg button-primary">
                        {location.pathname.indexOf(`/admin/tag/edit`) === -1
                          ? t('admin.add')
                          : t('admin.update')}
                      </button>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </Formik>
          </div>
        </Col>
      </Row>
    </section>
  );
};

const mapStateToProps = (state) => {
  const { tagDetail } = state.tagDetailReducer;

  return { tagDetail };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tagCreate: (params) => dispatch(tagCreate(params)),
    getTagDetail: (params) => dispatch(getTagDetail(params)),
    updateTag: (params) => dispatch(updateTag(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TagCreate);
