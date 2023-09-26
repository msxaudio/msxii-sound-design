"use client";
import { type ReactNode } from "react";
import BoxEditOverlay from "../../BoxEditOverlay";
import { type BoxTypeHeader, type PageStoreApi } from "../../types";
import { BoxTypes, HeaderBoxHType } from "@prisma/client";
import { useStore } from "zustand";
import { cx } from "class-variance-authority";
import {
  type FormStoreApi,
  type GetPassedValidationFieldsValues,
  useCreateFormStore,
} from "@de100/form-echo";
import { toast } from "react-toastify";

import customPageClasses from "~/app/styles/_custom-page.module.css";
import {
  type CustomCssFormStore,
  CustomCssForm,
} from "../../Css/CustomClasses";
import {
  type TwVariantsFormStore,
  TwVariantsForm,
  useCreateTwVariantsFormStore,
} from "../../Css/TwVariants";
import ContainedInputField from "~/app/components/common/@de100/form-echo/Fields/Contained/Input";
import Form from "~/app/components/common/@de100/form-echo/Forms";
import Accordion from "~/app/components/common/Accordion";
import { getValueByPathArray, newUpdatedByPathArray } from "~/libs/obj/update";
import { handleBoxVariants, type BoxVariants } from "~/libs/utils/appData";
import { createOneHeaderBoxSchema } from "~/libs/utils/validations-schemas/dashboard/boxes/types/headers";
import { CreateOneCustomCssSchema } from "~/libs/utils/validations-schemas/dashboard/css/customClasses";
import { trpcApi } from "~/app/libs/trpc/client";

type HeaderBox = {
  title: string;
  description: string | null;
  hType: HeaderBoxHType;
};
type HeaderFormStore = FormStoreApi<HeaderBox, typeof createOneHeaderBoxSchema>;
type SharedProps = {
  boxDeepLevel: number;
  parentBox?: BoxTypes;
  className?: string;
};
type Props = {
  box: BoxTypeHeader;
  path: (string | number)[];
  pageStore: PageStoreApi;
} & SharedProps;

const BOX_TYPE = BoxTypes.HEADER;

const HeaderBoxForm = (props: {
  store: HeaderFormStore;
  id: string;
  onSuccess: (params: {
    validatedValues: GetPassedValidationFieldsValues<
      typeof createOneHeaderBoxSchema
    >;
  }) => void;
}) => {
  const updateOneRequest =
    trpcApi.dashboard.boxes.types.headers.updateOne.useMutation({
      onError(error) {
        toast(error.message, { type: "error" });
      },
      onSuccess() {
        toast("Successful submission!", { type: "success" });
      },
    });

  return (
    <Form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={async (event, params) => {
        event.preventDefault();
        await updateOneRequest.mutateAsync({
          id: props.id,
          ...params.validatedValues,
        });

        props.onSuccess(params);
      }}
      store={props.store}
    >
      <ContainedInputField
        store={props.store}
        name="title"
        labelProps={{ children: "title" }}
      />
      <ContainedInputField
        isA="textarea"
        store={props.store}
        name="description"
        labelProps={{ children: "description" }}
        rows={15}
      />
      <button
        type="submit"
        disabled={updateOneRequest.isLoading}
        className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
      >
        submit
      </button>
    </Form>
  );
};

const HeaderBoxView = (
  props: {
    childrenAfter?: ReactNode;
    boxDeepLevel: number;
  } & SharedProps &
    HeaderBox,
) => {
  const HType = (() => {
    if (props.hType !== HeaderBoxHType.DYNAMIC)
      return props.hType.toLowerCase() as Lowercase<
        Exclude<(typeof props)["hType"], (typeof HeaderBoxHType)["DYNAMIC"]>
      >;

    if (props.boxDeepLevel >= 5) return "h6";

    return `h${props.boxDeepLevel}` as "h1" | "h2" | "h3" | "h4" | "h5";
  })();

  return (
    <header className={cx("relative flex flex-col gap-8", props.className)}>
      {props.title && (
        <HType
          className={cx(
            props.boxDeepLevel === 0 ? "font-semibold" : "",
            "text-h3 text-text-primary-500",
          )}
        >
          {props.title}
        </HType>
      )}
      {props.description && <p>{props.description}</p>}
      {props.childrenAfter}
    </header>
  );
};

const HeaderBoxFormView = (
  props: {
    headerFormStore: HeaderFormStore;
    boxDeepLevel: number;
    twVariantsFormStore: TwVariantsFormStore;
    customCssFormStore: CustomCssFormStore;
  } & SharedProps,
) => {
  const title = useStore(
    props.headerFormStore,
    (store) => store.fields.title.value,
  );
  const description = useStore(
    props.headerFormStore,
    (store) => store.fields.description.value,
  );
  const hType = useStore(
    props.headerFormStore,
    (store) => store.fields.hType.value,
  );
  const twVariantsStr = useStore(props.twVariantsFormStore, (store) =>
    handleBoxVariants(store.fields.twVariants.value),
  );

  const customCssStr = useStore(
    props.customCssFormStore,
    (store) =>
      store.fields.customClasses.value
        ?.map((key) => customPageClasses[key])
        .join(" ") ?? undefined,
  );

  const className = cx(
    props.className,
    customPageClasses[`${BOX_TYPE}-BOX`],
    twVariantsStr,
    customCssStr,
  );

  return (
    <HeaderBoxView
      title={title}
      description={description}
      hType={hType}
      className={className}
      boxDeepLevel={props.boxDeepLevel}
    />
  );
};

const HeaderBoxEditOverlay = (props: Props) => {
  const box = useStore(
    props.pageStore,
    (state) => getValueByPathArray<BoxTypeHeader>(state.page, props.path), // .slice(0, -1)
  );
  const headerFormStore: HeaderFormStore = useCreateFormStore({
    initValues: {
      title: box.headerBox.title,
      description: box.headerBox.description,
      hType: box.headerBox.hType,
    },
    validationSchema: createOneHeaderBoxSchema,
    validationEvents: { change: true },
    valuesFromFieldsToStore: {
      description: (val) => (val ? val : null),
    },
    valuesFromStoreToFields: {
      description: (val) => val ?? "",
    },
  });
  const twVariantsFormStore = useCreateTwVariantsFormStore(
    props.box.css.twVariants,
  );
  const customCssFormStore: CustomCssFormStore = useCreateFormStore({
    initValues: {
      customClasses: props.box.css.customClasses ?? [],
    },
    validationSchema: CreateOneCustomCssSchema,
  });

  return (
    <BoxEditOverlay
      {...props}
      ShowcaseBoxChildren={
        <HeaderBoxFormView
          boxDeepLevel={props.boxDeepLevel}
          parentBox={props.parentBox}
          className={props.className}
          //
          headerFormStore={headerFormStore}
          twVariantsFormStore={twVariantsFormStore}
          customCssFormStore={customCssFormStore}
        />
      }
      EditSideMenuChildren={
        <Accordion
          disclosures={[
            {
              contentChildren: (
                <TwVariantsForm
                  store={twVariantsFormStore}
                  cssId={box.css.id}
                  onSuccess={(params) => {
                    props.pageStore.getState().utils.setPage((page) => {
                      return newUpdatedByPathArray<
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        Exclude<typeof page, Function>
                      >([...props.path, "css"], page, (prev: BoxTypeHeader) => {
                        return {
                          ...prev,
                          twVariants: params.values.twVariants,
                        };
                      });
                    });
                  }}
                />
              ),
              titleElem: (
                <h3 className="text-h6 font-bold capitalize">
                  TW variants form
                </h3>
              ),
              ___key: "twVariants",
            },
            {
              isHidden: true,
              contentChildren: (
                <CustomCssForm
                  store={customCssFormStore}
                  cssId={box.css.id}
                  onSuccess={(params) => {
                    props.pageStore.getState().utils.setPage((page) => {
                      return newUpdatedByPathArray<
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        Exclude<typeof page, Function>
                      >([...props.path, "css"], page, (prev: BoxTypeHeader) => {
                        return {
                          ...prev,
                          customClasses: params.validatedValues.customClasses,
                        };
                      });
                    });
                  }}
                />
              ),
              titleElem: (
                <h3 className="text-h6 font-bold capitalize">custom classes</h3>
              ),
              ___key: "customCss",
            },
            {
              defaultOpen: true,
              contentChildren: (
                <HeaderBoxForm
                  store={headerFormStore}
                  id={box.headerBox.id}
                  onSuccess={(params) => {
                    props.pageStore.getState().utils.setPage((page) => {
                      return newUpdatedByPathArray<
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        Exclude<typeof page, Function>
                      >(
                        [...props.path, "headerBox"],
                        page,
                        (prev: BoxTypeHeader) => ({
                          ...prev,
                          title: params.validatedValues.title,
                          description: params.validatedValues.description,
                          hType: params.validatedValues.hType,
                        }),
                      );
                    });
                  }}
                />
              ),
              titleElem: (
                <h3 className="text-h6 font-bold capitalize">
                  header box form
                </h3>
              ),
              ___key: "headerBox",
            },
          ]}
        />
      }
    />
  );
};

export const HeaderBoxEditable = (props: Props) => {
  const box = useStore(props.pageStore, (state) =>
    getValueByPathArray<BoxTypeHeader>(state.page, props.path),
  );

  const headerBoxViewProps = {
    boxDeepLevel: props.boxDeepLevel,
    parentBox: props.parentBox,
    className: cx(
      customPageClasses[`${BOX_TYPE}-BOX`],
      props.className,
      handleBoxVariants(box.css.twVariants as BoxVariants),
      ...(box.css.customClasses
        ? box.css.customClasses?.map((key) => customPageClasses[key])
        : []),
    ),
    //
    title: box.headerBox.title,
    description: box.headerBox.description,
    hType: box.headerBox.hType,
  };

  return (
    <HeaderBoxView
      {...headerBoxViewProps}
      childrenAfter={<HeaderBoxEditOverlay {...props} />}
    />
  );
};