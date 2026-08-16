import RegistrationForm from "@/components/RegistrationForm"

const page = () => {
  return (
     <section
        id="registration"
        aria-label="Registration"
        style={{ backgroundColor: "var(--bg)", padding: "5rem 0" }}
      >
        <div className="container-orah">
          <div
            style={{
              maxWidth: "2048px",
              margin: "0 auto",
            }}
          >
            <RegistrationForm />
          </div>
        </div>
      </section>
  )
}

export default page