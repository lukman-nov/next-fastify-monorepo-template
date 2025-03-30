import type { useTranslations } from 'use-intl';
import type { ZodErrorMap } from 'zod';
import { defaultErrorMap, ZodIssueCode, ZodParsedType } from 'zod';

const jsonStringifyReplacer = (_: string, value: unknown): unknown => {
  if (typeof value === 'bigint') {
    return value.toString();
  }
  return value;
};

function joinValues<T extends unknown[]>(array: T, separator = ' | '): string {
  return array.map((val) => (typeof val === 'string' ? `'${val}'` : val)).join(separator);
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  if (typeof value !== 'object' || value === null) return false;

  for (const key in value) {
    if (!Object.prototype.hasOwnProperty.call(value, key)) return false;
  }

  return true;
};

const getKeyAndValues = (param: unknown, defaultKey: string): { values: Record<string, unknown>; key: string } => {
  if (typeof param === 'string') return { key: param, values: {} };

  if (isRecord(param)) {
    const key = 'key' in param && typeof param.key === 'string' ? param.key : defaultKey;
    const values = 'values' in param && isRecord(param.values) ? param.values : {};
    return { key, values };
  }

  return { key: defaultKey, values: {} };
};

interface ZodI18nMapOption {
  t: ReturnType<typeof useTranslations>;
  tForm?: ReturnType<typeof useTranslations>;
  tCustom?: ReturnType<typeof useTranslations>;
}

type MakeZodI18nMap = (option: ZodI18nMapOption) => ZodErrorMap;

export const makeZodI18nMap: MakeZodI18nMap = (option) => (issue, ctx) => {
  const { t, tForm, tCustom } = { ...option };

  let message: string;
  message = defaultErrorMap(issue, ctx).message;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const path: any = issue.path.length > 0 && !!tForm ? { path: tForm(issue.path.join('.') as any) } : {};

  if (issue.code === ZodIssueCode.invalid_arguments) {
    message = t('zod.errors.invalid_arguments', { defaultValue: message, ...path });
  }

  if (issue.code === ZodIssueCode.invalid_return_type) {
    message = t('zod.errors.invalid_return_type', { defaultValue: message, ...path });
  }

  if (issue.code === ZodIssueCode.invalid_date) {
    message = t('zod.errors.invalid_date', { defaultValue: message, ...path });
  }

  if (issue.code === ZodIssueCode.invalid_union) {
    message = t('zod.errors.invalid_union', { defaultValue: message, ...path });
  }

  if (issue.code === ZodIssueCode.invalid_intersection_types) {
    message = t('zod.errors.invalid_intersection_types', { defaultValue: message, ...path });
  }

  if (issue.code === ZodIssueCode.not_multiple_of) {
    message = t('zod.errors.not_multiple_of', { multipleOf: issue.multipleOf, defaultValue: message, ...path });
  }

  if (issue.code === ZodIssueCode.not_finite) {
    message = t('zod.errors.not_finite', { defaultValue: message, ...path });
  }

  if (issue.code === ZodIssueCode.custom) {
    const { key, values } = getKeyAndValues(issue.params?.i18n, 'errors.custom');
    message = (tCustom ?? t)(key, { ...values, ...path });
  }

  if (issue.code === ZodIssueCode.invalid_union_discriminator) {
    message = t('zod.errors.invalid_union_discriminator', {
      options: joinValues(issue.options),
      defaultValue: message,
      ...path,
    });
  }

  if (issue.code === ZodIssueCode.invalid_literal) {
    message = t('zod.errors.invalid_literal', {
      expected: JSON.stringify(issue.expected, jsonStringifyReplacer),
      defaultValue: message,
      ...path,
    });
  }

  if (issue.code === ZodIssueCode.invalid_enum_value) {
    message = t('zod.errors.invalid_enum_value', {
      options: joinValues(issue.options),
      received: issue.received,
      defaultValue: message,
      ...path,
    });
  }

  if (issue.code === ZodIssueCode.unrecognized_keys) {
    message = t('zod.errors.unrecognized_keys', {
      keys: joinValues(issue.keys, ', '),
      count: issue.keys.length,
      defaultValue: message,
      ...path,
    });
  }

  if (issue.code === ZodIssueCode.too_big) {
    const maximum = issue.type === 'date' ? new Date(issue.maximum as number) : issue.maximum;
    message = t(
      `zod.errors.too_big.${issue.type}.${issue.exact ? 'exact' : issue.inclusive ? 'inclusive' : 'not_inclusive'}`,
      {
        maximum,
        count: typeof maximum === 'number' ? maximum : undefined,
        defaultValue: message,
        path: path,
        ...path,
      }
    );
  }

  if (issue.code === ZodIssueCode.too_small) {
    const minimum = issue.type === 'date' ? new Date(issue.minimum as number) : issue.minimum;
    message = t(
      `zod.errors.too_small.${issue.type}.${issue.exact ? 'exact' : issue.inclusive ? 'inclusive' : 'not_inclusive'}`,
      {
        minimum,
        count: typeof minimum === 'number' ? minimum : undefined,
        defaultValue: message,
        path: path,
        ...path,
      }
    );
  }

  if (issue.code === ZodIssueCode.invalid_type) {
    if (issue.received === ZodParsedType.undefined) {
      message = t('zod.errors.invalid_type_received_undefined', { defaultValue: message, ...path });
    } else if (issue.received === ZodParsedType.null) {
      message = t('zod.errors.invalid_type_received_null', { defaultValue: message, ...path });
    } else {
      message = t('zod.errors.invalid_type', {
        expected: t(`types.${issue.expected}`, { defaultValue: issue.expected }),
        received: t(`types.${issue.received}`, { defaultValue: issue.received }),
        defaultValue: message,
        ...path,
      });
    }
  }

  if (issue.code === ZodIssueCode.invalid_string) {
    if (typeof issue.validation === 'object') {
      if ('startsWith' in issue.validation) {
        message = t(`zod.errors.invalid_string.startsWith`, {
          startsWith: issue.validation.startsWith,
          defaultValue: message,
          ...path,
        });
      } else if ('endsWith' in issue.validation) {
        message = t(`zod.errors.invalid_string.endsWith`, {
          endsWith: issue.validation.endsWith,
          defaultValue: message,
          ...path,
        });
      }
    } else {
      message = t(`zod.errors.invalid_string.${issue.validation}`, {
        validation: t(`zod.validations.${issue.validation}`, {
          defaultValue: issue.validation,
        }),
        defaultValue: message,
        ...path,
      });
    }
  }

  return { message };
};
