import { useEffect, useState } from "react";

import { Search, Plus, Trash2, X, Pencil } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";

import { fetchContacts, removeContact } from "../redux/slices/contactSlice";

import { createContact, updateContact } from "../services/contactApi";

import { createConversation } from "../services/conversationApi";

const Contacts = () => {
  const dispatch = useDispatch();

  const { contacts, loading } = useSelector((state) => state.contact);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    tags: "",
  });

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone) {
      return toast.error("Fill all fields");
    }

    try {
      const payload = {
        name: form.name,

        phone: form.phone,

        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      // EDIT MODE

      if (editingId) {
        await updateContact(editingId, payload);

        toast.success("Contact updated");
      }

      // ADD MODE
      else {
        const newContact = await createContact(payload);

        await createConversation({
          contact: newContact._id,

          lastMessage: "Start conversation",

          lastMessageAt: new Date(),
        });

        toast.success("Contact added");
      }

      dispatch(fetchContacts());

      setForm({
        name: "",
        phone: "",
        tags: "",
      });

      setEditingId(null);

      setOpen(false);
    } catch (err) {
      console.log(err);

      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    await dispatch(removeContact(id));

    toast.success("Deleted");
  };

  const filtered = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.phone.includes(search),
  );

  return (
    <div>
      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Contacts</h1>

          <p className="text-slate-400">Manage your contacts</p>
        </div>

        <button
          onClick={() => {
            setEditingId(null);

            setForm({
              name: "",
              phone: "",
              tags: "",
            });

            setOpen(true);
          }}
          className="bg-emerald-500 hover:bg-emerald-600 transition px-5 py-3 rounded-xl flex items-center gap-2 font-medium"
        >
          <Plus size={18} />
          Add Contact
        </button>
      </div>

      {/* SEARCH */}

      <div className="relative mb-6">
        <Search size={18} className="absolute left-4 top-4 text-slate-400" />

        <input
          type="text"
          placeholder="Search contact..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-12 p-4"
        />
      </div>

      {/* LIST */}

      <div className="grid gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : filtered.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center text-slate-400">
            No contacts found
          </div>
        ) : (
          filtered.map((contact) => (
            <motion.div
              key={contact._id}
              whileHover={{
                scale: 1.01,
              }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-lg">
                  {contact.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3 className="font-semibold text-lg">{contact.name}</h3>

                  <p className="text-slate-400">{contact.phone}</p>

                  <div className="flex gap-2 mt-2 flex-wrap">
                    {contact.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-lg text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {/* EDIT */}

                <button
                  onClick={() => {
                    setEditingId(contact._id);

                    setForm({
                      name: contact.name,

                      phone: contact.phone,

                      tags: contact.tags?.join(", ") || "",
                    });

                    setOpen(true);
                  }}
                  className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 p-3 rounded-xl transition"
                >
                  <Pencil size={18} />
                </button>

                {/* DELETE */}

                <button
                  onClick={() => handleDelete(contact._id)}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-3 rounded-xl transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* MODAL */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          >
            <motion.form
              initial={{
                scale: 0.9,
              }}
              animate={{
                scale: 1,
              }}
              onSubmit={handleAdd}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md"
            >
              <div className="flex justify-between mb-5">
                <h2 className="text-xl font-bold">
                  {editingId ? "Edit Contact" : "Add Contact"}
                </h2>

                <button type="button" onClick={() => setOpen(false)}>
                  <X />
                </button>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  className="w-full bg-slate-800 rounded-xl p-4"
                />

                <input
                  type="text"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value,
                    })
                  }
                  className="w-full bg-slate-800 rounded-xl p-4"
                />

                <input
                  type="text"
                  placeholder="Tags (vip, lead)"
                  value={form.tags}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      tags: e.target.value,
                    })
                  }
                  className="w-full bg-slate-800 rounded-xl p-4"
                />

                <button className="w-full bg-emerald-500 py-4 rounded-xl font-semibold">
                  {editingId ? "Update Contact" : "Add Contact"}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contacts;
