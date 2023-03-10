import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import validator from "validator";

export default function EditProfileForm(props) {
  const form = useForm({
    initialValues: props.data,

    validationRules: {
      name: (name) => name.length > 0,
      email: (email) => validator.isEmail(email),
      address: (address) => address.length > 0,
      workplace: (workplace) => workplace.length > 0,
      phone: (phone) => validator.isMobilePhone(phone),
    },

    errorMessages: {
      name: "Valós nevet adjon meg!",
      email: "Érvényes e-mail címet adjon meg!",
      address: "Valós lakcímet adjon meg!",
      workplace: "Valós munkahelyet adjon meg!",
      phone: "Valós telefonszámot adjon meg!",
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => props.submitForm(props.data, values))}
    >
      <TextInput
        label="Nombre"
        placeholder="Nombre"
        {...form.getInputProps("name")}
      />

      <TextInput
        label="E-mail"
        placeholder="E-mail"
        {...form.getInputProps("email")}
      />

      <TextInput
        label="Dirección"
        placeholder="Dirección"
        {...form.getInputProps("address")}
      />

      <TextInput
        label="Edad"
        placeholder="Edad"
        {...form.getInputProps("workplace")}
      />

      <TextInput
        label="Teléfono"
        placeholder="Teléfono"
        {...form.getInputProps("phone")}
      />

      <Button mt={20} type="submit">
        Guardar
      </Button>
    </form>
  );
}
